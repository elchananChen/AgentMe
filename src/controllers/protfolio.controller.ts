import { Request, Response } from "express";
import { askPortfolioAgent } from "../services/protfolioAgent.service";
import { GOOGLE_AI_MODELS } from "../config/ai.config";

export const askPortfolioAgentController = async (req: Request, res: Response) => {
    console.log("in portfolio controller");

    const { question } = req.body;
    const answer = await askPortfolioAgent(question, GOOGLE_AI_MODELS.DEFAULT);
    res.json({ answer });
}