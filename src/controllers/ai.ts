import dotenv from 'dotenv';
dotenv.config();    
console.log("My Key starts with:", process.env.GOOGLE_GENERATIVE_AI_API_KEY?.substring(0, 5));
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
const model = google('gemini-1.5-flash');

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


console.log(await generateTextToQuestion(`Software Engineer dedicated to building robust architectures for high-performance systems.
Passionate about tackling complex data challenges, isolating system bottlenecks, and driving engineering efficiency through AI-driven workflows. 
A highly organized professional with a disciplined approach rooted in IDF Golani Brigade service, committed to data integrity and scalable backend design.`, "what is the best way to improve my resume?"));