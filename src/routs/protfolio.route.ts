import { Router } from "express";
import { askPortfolioAgentController } from "../controllers/protfolio.controller";

const router = Router();

router.post("/portfolio/ask", askPortfolioAgentController);

export default router;