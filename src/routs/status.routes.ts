import { Router } from 'express';
import { getStatusController } from '../controllers/health.controller';

const router = Router();
router.get("/", getStatusController);

export default router;