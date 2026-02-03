import express from "express";
import dotenv from "dotenv";

dotenv.config();
import morgan from "morgan";
import { getLocalIP } from "./utils/utils";
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const model = google('gemini-2.5-flash');
// gemini-2.5-flash-lite - faster and cheaper
// gemini-2.5-flash - balanced
// gemini-2.5-flash-pro - more powerful

const app = express();
const PORT = process.env.PORT || 3000;
const localIP = getLocalIP();



export const generateTextToQuestion = async (resumeText: string, question: string) => {
   const { text } = await generateText({
      model: model,
      system: `You are a professional assistant who specializes in CV analysis.
               Use the following text to answer the user's questions accurately:
               ---
               ${resumeText}
               ---`,
      prompt: question,
    });
    return text;
};


// console.log(await generateTextToQuestion(`Software Engineer dedicated to building robust architectures for high-performance systems.
// Passionate about tackling complex data challenges, isolating system bottlenecks, and driving engineering efficiency through AI-driven workflows. 
// A highly organized professional with a disciplined approach rooted in IDF Golani Brigade service, committed to data integrity and scalable backend design.`
// , "are this engineer a good fit for a job in the AI field? if not please suggest what he need to improve"));

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
