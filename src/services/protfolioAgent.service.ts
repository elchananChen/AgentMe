import { generateText, LanguageModel, ToolSet, stepCountIs } from "ai";
import { loadContext } from "./context.service";
import { google } from "@ai-sdk/google";
import { AGENT_PROMPTS } from "../config/agent.config";
// gemini-2.5-flash-lite - faster and cheaper
// gemini-2.5-flash - balanced
// gemini-2.5-flash-pro - more powerful
const GEMINI_2_5_FLASH = google('gemini-2.5-flash');


export const askPortfolioAgent = async (tools:any, question: string , model: LanguageModel, isShort = true) => {
   const context = await loadContext();
   const userReferance = 
      isShort ?
      AGENT_PROMPTS.STYLE_PREFERENCES.SHORT :
      AGENT_PROMPTS.STYLE_PREFERENCES.LONG;

   const { text } = await generateText({
      model: model,
      system: `

${AGENT_PROMPTS.IDENTITY.V2}

Guidelines: 
${AGENT_PROMPTS.GUIDELINES.V2}

User Referance: 
${userReferance}

               ---
               ${context}
               ---`,
      prompt: question,
      tools: tools,
      // @ts-ignore - stopWhen is the correct property for this version of the SDK
      stopWhen: stepCountIs(5),
      onStepFinish: ({ text, toolCalls, toolResults, finishReason, usage }) => {
        console.log(`🤖 Step Finished. Reason: ${finishReason}`);
        if (text) console.log(`🤖 Text Generated: ${text.substring(0, 50)}...`);
        if (toolCalls && toolCalls.length > 0) console.log(`🤖 Tool Calls: ${toolCalls.map(tc => tc.toolName).join(', ')}`);
        if (toolResults && toolResults.length > 0) console.log(`🤖 Tool Results: ${toolResults.length} results received`);
      }
    });
    return text;
};
