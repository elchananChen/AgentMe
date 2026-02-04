import { HealthService } from '../services/health.service';
import { Request, Response } from 'express';

const healthService = new HealthService();

export const getStatusController = async (req: Request, res: Response) => {
  try {
    const status = await healthService.getStatus();
    res.json(status);
  } catch (error: Error | unknown) {
    console.error(error);
    res.status(500).json({ status: "error", timestamp: new Date().toISOString(), error: error instanceof Error ? error.message : "Unknown error" });
  }
};