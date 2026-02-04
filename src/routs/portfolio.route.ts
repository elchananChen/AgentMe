import express from "express";
import { askPortfolioAgentController } from "../controllers/protfolio.controller";

const router = express.Router();

router.post("/ask", askPortfolioAgentController);

export default router;