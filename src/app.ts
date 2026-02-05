import express from "express";
import dotenv from "dotenv";

import morgan from "morgan";
import { getLocalIP } from "./utils/utils";

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
app.use(express.json());
app.use(morgan("tiny"));

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