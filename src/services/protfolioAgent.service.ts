import { generateText, LanguageModel } from "ai";
import { loadContext } from "./context.service";
import { google } from "@ai-sdk/google";



// gemini-2.5-flash-lite - faster and cheaper
// gemini-2.5-flash - balanced
// gemini-2.5-flash-pro - more powerful
const GEMINI_2_5_FLASH = google('gemini-2.5-flash');

export const askPortfolioAgent = async (question: string , model: LanguageModel) => {
  const context = await loadContext();
   const { text } = await generateText({
      model: model,
      system: `
    You are Elchanan Chen's Personal AI Portfolio Agent. 
    Your goal is to answer questions about Elchanan's experience, skills, and projects based on the provided context.
    
    Guidelines:
    1. Be professional, direct, and mission-oriented (reflecting Elchanan's background).
    2. Use the following context to provide accurate answers.
    3. If the information is not in the context, say you don't know rather than hallucinating.
    4. Highlight Elchanan's engineering principles like "Plan-First" and "Clean Engineering".
               ---
               ${context}
               ---`,
      prompt: question,
    });
    return text;
};

