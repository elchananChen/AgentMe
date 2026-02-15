import { Request, Response } from "express";
import { askPortfolioAgent } from "../services/protfolioAgent.service";
import { GOOGLE_AI_MODELS } from "../config/ai.config";
import { githubTools } from "../services/tools.service";
import { AskPortfolioAgentRequest } from "../types/portfolio.types";


export const askPortfolioAgentController = async (req: Request<{}, {}, AskPortfolioAgentRequest>, res: Response) => {
    const { settings, question } = req.body;
    const isShort = settings?.isShort ?? true;

    if (!question) {
        return res.status(400).json({ error: "Question is required" });
    }

    const answer = await askPortfolioAgent(githubTools, question, GOOGLE_AI_MODELS.FAST, isShort);
    res.json({ answer });
}