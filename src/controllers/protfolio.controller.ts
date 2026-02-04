import { askPortfolioAgent } from "../app";
import { Request, Response } from "express";

export const askPortfolioAgentController = async (req: Request, res: Response) => {
    const { question } = req.body;
    const answer = await askPortfolioAgent(question);
    res.json({ answer });
}