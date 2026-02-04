import express from "express";
import dotenv from "dotenv";

import morgan from "morgan";
import { getLocalIP } from "./utils/utils";
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { loadContext } from './services/context.service';

dotenv.config();

// gemini-2.5-flash-lite - faster and cheaper
// gemini-2.5-flash - balanced
// gemini-2.5-flash-pro - more powerful
const model = google('gemini-2.5-flash');

const app = express();
const PORT = process.env.PORT || 3000;
const localIP = getLocalIP();

export const askPortfolioAgent = async (question: string) => {
  const context = await loadContext();
   const { text } = await generateText({
      model: model,
      system: `You are Elchanan Chen's Personal AI Portfolio Agent. 
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

console.log(await askPortfolioAgent(`are Elchanan authority
   in is proffetion?  `
));


// middlewares
app.use(express.json());
app.use(morgan("tiny"));

 
app.listen(PORT, () => {
  if (localIP) {
    console.log(`Server is running on http://${localIP}:${PORT}`);
  } else {
    console.log(`Server is running on http://localhost:${PORT}`);
  }
});
