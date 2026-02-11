import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import { getLocalIP } from "./utils/utils";
import cors from "cors";

// routes
import portfolioRouter from "./routs/portfolio.route";
import { SyncService } from "./services/sync.service";
import statusRouter from "./routs/status.routes";

dotenv.config();

// Sync repositories on startup
SyncService.syncRepos();

const app = express();
const PORT = process.env.PORT || 3000;
const localIP = getLocalIP();

// middlewares
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

app.use(cors({
  origin: ["http://localhost:5173", "https://agent-me-164419455256.me-west1.run.app"],
  credentials: true
}));
app.use(express.json());

const logFormat = process.env.NODE_ENV === "staging" || process.env.NODE_ENV === "production" ? "combined" : "tiny";
app.use(morgan(logFormat));

// routes
app.use("/api/status", statusRouter);
app.use("/api/portfolio", portfolioRouter);

// start server
app.listen(PORT, () => {
  if (localIP) {
    console.log(`Server is running on http://${localIP}:${PORT}`);
  } else {
    console.log(`Server is running on http://localhost:${PORT}`);
  }
});