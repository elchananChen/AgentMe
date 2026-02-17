/**
 * scannerEngine.ts
 * 
 * An AI Agent that uses reasoning and GitHub tools to analyze 
 * remote repositories and generate structured metadata.
 */

import { generateText, stepCountIs } from "ai";
import { githubTools } from "../services/tools.service";
import { GOOGLE_AI_MODELS } from "../config/ai.config";
import fs from 'fs/promises';
import path from 'path';

export const EXTRACTION_PROMPT = `
You are a Senior Software Architect analyzing a GitHub repository to extract institutional knowledge.
Your goal is to understand the "Why" and "How" of the project, not just the "What".

PROCESS:
1. Examine the project structure to identify key modules.
2. Read entry points (package.json, main files, etc.) to understand the tech stack.
3. Dive into core logic (controllers, services, database schemas).
4. GENERATE a professional summary.

RULES:
- Do NOT repeat the same tool call with the same path/arguments.
- If you have already explored a folder or file, use that information.
- Once you have enough information, generate the final summary immediately.
`;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function scanRemoteProjectAsAgent(repoName: string, owner: string = 'ElchananChen') {
    console.log(`🤖 Agent: Starting research for ${owner}/${repoName}...`);

    let messages: any[] = [
        { role: 'user', content: `Scan the repository "${repoName}" owned by "${owner}" and provide the summary.` }
    ];

    const maxSteps = 20; 
    let currentStep = 0;
    let finalResult = "";
    const toolCallHistory = new Set<string>();

    while (currentStep < maxSteps) {
        try {
            const result = await generateText({
                model: GOOGLE_AI_MODELS.FAST,
                system: EXTRACTION_PROMPT,
                messages: messages,
                tools: githubTools,
                // Increasing to 10 steps per chunk to allow better reasoning flow. 
                // This gives the agent more 'breath' to finish research before encountering a pause.
                stopWhen: stepCountIs(10), 
                onStepFinish: ({ toolCalls }) => {
                    toolCalls?.forEach(tc => {
                        // Use any to bypass version-specific toolCall type issues
                        const tcAny = tc as any;
                        const args = tcAny.args || tcAny.toolCall?.args || {};
                        const callKey = `${tc.toolName}:${JSON.stringify(args)}`;
                        
                        if (toolCallHistory.has(callKey)) {
                            console.warn(`⚠️ Warning: Agent is repeating ${tc.toolName} with same args.`);
                        }
                        toolCallHistory.add(callKey);
                        console.log(`🤖 Step ${currentStep + 1}/${maxSteps}: Calling ${tc.toolName}...`);
                    });
                },
                maxOutputTokens: 2500,
                temperature: 0,
            });

            const resultAny = result as any;
            const stepMessages = (resultAny.responseMessages || (resultAny.steps && resultAny.steps.flatMap((s: any) => s.responseMessages)) || []);
            const validMessages = stepMessages.filter((msg: any) => msg && typeof msg === 'object');
            
            if (validMessages.length > 0) {
                messages = [...messages, ...validMessages];
                
                // Check if any tool result in this step was a GitHub Rate Limit error
                const hasGitHubLimit = validMessages.some((m: any) => 
                    m.role === 'tool' && 
                    typeof m.content === 'string' && 
                    m.content.includes('rate limit exceeded')
                );

                if (hasGitHubLimit) {
                    console.error(`⚠️ Agent: Detected GitHub Rate Limit in tool output. Waiting 60s...`);
                    await sleep(61000);
                    // We don't increment currentStep here because we want to retry the reasoning from this point
                    continue; 
                }
            }

            // Only capture result.text as finalResult if it's not an apology
            const isApology = result.text.toLowerCase().includes('rate limit') || result.text.toLowerCase().includes('cannot provide');
            if (result.text && result.text.length > 200 && !isApology) {
                finalResult = result.text;
            }
            
            if (result.finishReason === 'stop' || result.finishReason === 'length') {
                if (finalResult) break;
                if (isApology) {
                     console.warn(`⚠️ Agent tried to stop with an apology. Continuing research...`);
                }
            }
            
            currentStep++;
        } catch (err: any) {
            const isRateLimit = err.statusCode === 429 || err.status === 403 || err.message?.toLowerCase().includes('quota') || err.message?.toLowerCase().includes('rate limit');
            if (isRateLimit) {
                console.error(`⚠️ Agent: API Limit hit (Catch). Waiting 60s...`);
                await sleep(61000);
                continue; 
            }
            throw err;
        }
    }

    if (!finalResult || finalResult.trim().length < 100) {
        throw new Error(`Agent failed to generate a valid architectural summary for ${repoName}. Last output was an apology or hit limits.`);
    }

    // Save to knowledge folder
    const outputPath = path.resolve(process.cwd(), 'knowledge/projects', `${repoName}.md`);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, finalResult);
    console.log(`✅ Agent: Summary saved to ${outputPath}`);
    return finalResult;
}
