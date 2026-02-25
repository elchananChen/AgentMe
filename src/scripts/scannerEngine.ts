/**
 * scannerEngine.ts
 * 
 * An AI Agent that uses reasoning and GitHub tools to analyze 
 * remote repositories and generate structured metadata.
 */

import { generateText, stepCountIs } from "ai";
import { githubTools } from "../services/tools.service";
import { GOOGLE_AI_MODELS } from "../config/ai.config";
import { githubLib } from "../lib/github";
import fs from 'fs/promises';
import path from 'path';
import util from 'util';


const debug = (label: string, value: any) => {
  console.log(
    `${label}:\n`,
    util.inspect(value, { depth: null, colors: true })
  );
};

type GitHubToolArgs = {
    path?: string;
    paths?: string[];
    repo?: string;
    owner?: string;
}

export const EXTRACTION_PROMPT = `
You are a Senior Software Architect analyzing a GitHub repository to extract deep institutional knowledge.
Your goal is to produce a comprehensive, structured analysis suitable for a professional portfolio and CV.
You must understand the "Why" and "How" of the project, not just the "What".

## ANALYSIS PROCESS (follow in order):
1. Use getProjectStructure to map the full file tree. Ignore anything under node_modules/, dist/, build/, .next/, .git/, and lock files.
2. Resource Optimization: At the start of your research,
   use getRateLimit to understand your budget.
   Maximize efficiency by using getFilesCode to batch-request ALL identified core files at once
   (e.g., all models, controllers, and configurations) if the rate limit allows.
   Do not hesitate to request 10+ files in a single call to build a complete architectural mental model as quickly as possible.
3. READ every package.json file (root + any sub-projects like Client/package.json, Server/package.json). Extract ALL dependencies — every single library, no matter how small.
4. Read key entry points (main files, app configs, index files) to understand architecture.
5. Dive into core logic: controllers, services, models/schemas, middleware, hooks, utils.
6. Look for: test files/folders, Docker/CI configs, .env.example, README, config files.
7. Identify impressive engineering patterns, best practices, and clever solutions.
9. Produce the final structured output following the EXACT template below.

## STRICT RULES:
- Do NOT repeat the same tool call with the same path/arguments.
- If you have already explored a folder or file, use that information.
- NEVER guess or assume technology. If you cannot confirm from source code, write "Not confirmed in source".
- NEVER include meta-commentary like "I have enough information", "Based on my analysis", "Let me check", etc.
- Output ONLY the structured markdown result. Nothing else.
- List EVERY dependency from package.json — even small utilities like lodash, dayjs, uuid, classnames, etc.
- Once you have enough information, generate the final summary immediately.

## REQUIRED OUTPUT TEMPLATE (follow this exactly):

# [Project Name]

> One-sentence elevator pitch of what this project is and does.

## Project Overview
- **Type**: [Full-stack App / Frontend SPA / Backend API / CLI Tool / Library / etc.]
- **Purpose**: [What problem does it solve? What is the user journey?]
- **Scale**: [Estimated number of components, API endpoints, pages, models, etc.]
- **Monorepo?**: [Yes/No — describe sub-projects if applicable]

## Technology Stack

### Frontend
| Category | Technology | Details |
|----------|-----------|----------|
| Framework | | version if found |
| Build Tool | | |
| Styling | | |
| State Management | | |
| Routing | | |
| Forms / Validation | | |
| HTTP Client | | |
| UI Component Library | | |
| Internationalization | | |
| Animation | | |
| Other | | |

### Backend
| Category | Technology | Details |
|----------|-----------|----------|
| Runtime | | |
| Framework | | |
| Database | | |
| ORM / ODM | | |
| Authentication | | |
| Caching | | |
| Payment | | |
| File Upload | | |
| Email | | |
| Other | | |

## Full Dependency List

### Frontend Dependencies
#### Production
- List every dependency from package.json with a brief one-line description of what it does

#### Dev Dependencies
- List every devDependency

### Backend Dependencies
#### Production
- List every dependency from package.json with a brief one-line description

#### Dev Dependencies
- List every devDependency

## Architecture & Project Structure
- Describe the architectural pattern (MVC, Clean Architecture, Feature-based, etc.)
- Key directories and their responsibilities
- Data flow overview (client → API → DB)
- Notable structural decisions

## Core Features & Business Logic
For each major feature:
1. **Feature Name**: Description of what it does, which files implement it, and any notable implementation details.

## Impressive Patterns & Best Practices
Identify and describe the most impressive engineering decisions. Look for:
- Custom hooks and their reuse patterns
- Middleware chains and error handling strategies
- Type safety patterns (generics, discriminated unions, etc.)
- Caching strategies (Redis, in-memory, HTTP cache headers)
- Performance optimizations (lazy loading, code splitting, virtualization, pagination, infinite scroll)
- Security practices (input validation, sanitization, rate limiting, CORS, helmet, CSP)
- Database patterns (indexing strategies, aggregation pipelines, population/joins)
- API design quality (RESTful conventions, error responses, pagination)
- Code organization and separation of concerns
- Reusable component patterns
- Any design patterns used (Factory, Strategy, Observer, etc.)

## Testing & Quality
- Test framework(s) used (Jest, Vitest, Cypress, etc.)
- Types of tests present (unit, integration, e2e)
- Test coverage observations
- Linting / formatting tools (ESLint, Prettier, etc.)
- If no tests exist, state "No tests found in the repository"

## DevOps & Infrastructure
- Docker / containerization
- CI/CD pipelines (GitHub Actions, etc.)
- Environment configuration (.env files, config patterns)
- Deployment target (if identifiable)
- Scripts in package.json worth noting

## Security Practices
- Authentication & authorization approach
- Input validation & sanitization
- Security headers & middleware
- Secrets management
- Any OWASP considerations observed

## Portfolio-Ready Highlights
Bullet points of quantifiable achievements and impressive facts, written as if for a resume or portfolio. Examples:
- "Built X custom React components with full TypeScript coverage"
- "Implemented real-time Y with WebSockets handling Z concurrent connections"
- "Integrated Stripe payment flow with webhook handling and idempotency"
- "Designed RESTful API with X endpoints across Y resource domains"
- "Full i18n support with X languages"
`;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function scanRemoteProjectAsAgent(repoName: string, owner: string = 'ElchananChen') {
    console.log(`🤖 Agent: Starting research for ${owner}/${repoName}...`);

    let messages: any[] = [
        { role: 'user', content: `Scan the repository "${repoName}" owned by "${owner}" and provide the summary.` }
    ];

    const maxSteps = 2; // More steps since batches are smaller (3 instead of 10)
    let currentStep = 0;
    let finalResult = "";
    const toolCallHistory = new Set<string>();
    const processedToolCallIds = new Set<string>(); // Prevent duplicate logging if onStepFinish is cumulative
    const exploredPaths = new Set<string>(); // Track all explored files across retries
    const STEP_DELAY_MS = 5000; // Proactive delay between steps to avoid RPM limits
    let log = true
    let logCount = 0
    while (currentStep < maxSteps) {
        // Capture partial progress from onStepFinish — survives generateText crashes
        let capturedStepMessages: any[] = [];

        try {
            const result = await generateText({
                model: GOOGLE_AI_MODELS.FAST,
                system: EXTRACTION_PROMPT,
                messages: messages,
                tools: githubTools,
                // Increase to 10 steps for deeper exploration per chunk as requested
                stopWhen: stepCountIs(30), 
                
                onStepFinish: async ({ toolCalls, response ,usage}) => {
                    currentStep++
                    // === CRASH RECOVERY: Save progress incrementally ===
                    // response.messages contains the messages from this step.
                    // If generateText later throws (rate limit), we still have these.
                    // debug('response', response);
                    // debug('toolCalls', toolCalls);
                    
                    if (response?.messages) {
                        capturedStepMessages = [...capturedStepMessages, ...response.messages];
                       if(log){
                           console.log("====================");
                           response.messages.forEach(message => {
                            if (message.role === "assistant") {
                                debug("message", message);
                            }
                           });
                           console.log("====================");
                           
                           if (logCount < 2){
                            logCount++
                           }else{
                            log = false
                           }
                        }

                        console.log("-------------------");
                        console.log("response.messages exist and captured, StepMessages length: ", capturedStepMessages.length);
                        console.log("-------------------");
                    }
                    //   debug('capturedStepMessages', capturedStepMessages);
                    
                    toolCalls?.forEach(tc => {

                        if (!('input' in tc)) {
                            debug('No args in tool call', tc);
                            return;
                        }

                        const args = tc.input as GitHubToolArgs

                        const toolCallId = tc.toolCallId;
                        // Skip if we already processed this specific tool call instance
                        if (toolCallId && processedToolCallIds.has(toolCallId)) {
                            debug('Already processed tool call', tc);
                            return;
                        }

                        if (toolCallId) processedToolCallIds.add(toolCallId);

                        const callKey = `${tc.toolName}:${JSON.stringify(args)}`;

                        // Track explored file paths for anti-repeat guidance
                        if (tc.toolName === 'getFileCode' && args.path) {
                            exploredPaths.add(args.path);
                        }
                        if (tc.toolName === 'getFilesCode' && Array.isArray(args.paths)) {
                            args.paths.forEach(p => exploredPaths.add(p));
                        }

                        if (tc.toolName === 'getProjectStructure') {
                            exploredPaths.add('__PROJECT_STRUCTURE__');
                        }

                        if (toolCallHistory.has(callKey)) {
                            console.warn(`⚠️ Warning: Agent is repeating ${tc.toolName} with same args.`);
                        }
                        toolCallHistory.add(callKey);
                        debug('toolCallHistory', toolCallHistory);
                        console.log(`🤖 Step ${currentStep + 1}/${maxSteps}: Calling ${tc.toolName}...`);
                    });

                    console.log('\n--- 📊 Research Progress ---');
                    console.log(`📁 Files Read: ${exploredPaths.size}`);
                    
                    if (exploredPaths.size > 0) {
                        console.log(`📍 Explored: ${Array.from(exploredPaths).slice(-3).join(', ')}...`);
                    }

                    console.log(`🪙 Tokens used this step: ${usage.totalTokens}`);
                    console.log('---------------------------\n');
                    
                    // === PROACTIVE THROTTLE ===
                    // Sleep between steps to stay under RPM limits
                    console.log(`⏳ Breathing ${STEP_DELAY_MS / 1000}s between steps...`);
                    
                    await sleep(STEP_DELAY_MS);
                    console.log("continue!");
                },
                maxOutputTokens: undefined,
                temperature: 0,
            });

            // === SUCCESS PATH: Normal message extraction ===
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

            // Proactive breathing between successful chunks too
            console.log(`✅ Chunk ${currentStep}/${maxSteps} complete. Breathing before next chunk...`);
            await sleep(STEP_DELAY_MS);

        } catch (err: any) {
            const errMessage = err.message?.toLowerCase() || "";
            const isGoogleRateLimit = err.statusCode === 429 || err.statusCode === 503 || errMessage.includes('quota') || errMessage.includes('rate limit') || errMessage.includes('too many requests') || errMessage.includes('high demand') || errMessage.includes('unavailable');
            
            if (isGoogleRateLimit) {
                console.error(`\n❌ API Limit or Availability Issue: Google AI SDK (Gemini)`);
                if (errMessage.includes('prm')) console.error(`📌 Detail: PRM (Requests Per Minute) limit reached.`);
                else if (errMessage.includes('prd')) console.error(`📌 Detail: PRD (Requests Per Day) limit reached.`);
                else if (errMessage.includes('tpm')) console.error(`📌 Detail: TPM (Tokens Per Minute) limit reached.`);
                else if (err.statusCode === 503 || errMessage.includes('high demand')) console.error(`📌 Detail: Model is currently experiencing high demand (503).`);
                console.error(`Original Error: ${err.message}`);

                // === KEY FIX: Preserve partial progress from completed steps ===
                if (capturedStepMessages.length > 0) {
                    const validPartial = capturedStepMessages.filter((msg: any) => msg && typeof msg === 'object');
                    if (validPartial.length > 0) {
                        messages = [...messages, ...validPartial];
                        console.log(`💾 Saved ${validPartial.length} messages from partial progress before Google rate limit.`);
                    }
                } else if (exploredPaths.size > 0) {
                    const filePaths = Array.from(exploredPaths).filter(p => p !== '__PROJECT_STRUCTURE__');
                    const hasStructure = exploredPaths.has('__PROJECT_STRUCTURE__');
                    let guidance = 'IMPORTANT: You have already explored this repository. Do NOT re-read files you already know.';
                    if (hasStructure) guidance += 'You have already retrieved the project structure.';
                    if (filePaths.length > 0) guidance += ` You have already read these files: ${filePaths.join(', ')}.`;
                    guidance += ' Continue your analysis using the information you already gathered and focus on generating the final structured output.';
                    
                    messages.push({ role: 'user', content: guidance });
                    console.log(`📋 Injected anti-repeat guidance for ${exploredPaths.size} explored paths.`);
                }

                currentStep++;
                console.log(`⏳ Waiting 60s for Google AI quota to reset...`);
                await sleep(61000);
                continue; 
            }

            // Check if it's a GitHub Rate Limit (Secondary or Primary)
            const isGitHubRateLimit = err.status === 403 || errMessage.includes('secondary rate limit') || errMessage.includes('rate limit exceeded');
            if (isGitHubRateLimit) {
                console.error(`\n❌ API Limit Hit: GitHub API`);
                try {
                    const rl = await githubLib.getRateLimit();
                    console.error(`📊 Current GitHub Status: ${rl.resources.core.remaining}/${rl.resources.core.limit}`);
                    console.error(`📅 Resets at: ${new Date(rl.resources.core.reset * 1000).toLocaleString()}`);
                } catch (rlErr) {
                    console.error(`Could not fetch GitHub rate limit status:`, rlErr);
                }
                
                console.error(`Original Error: ${err.message}`);
                currentStep++;
                console.log(`⏳ Waiting 60s for GitHub limits to breathe...`);
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
