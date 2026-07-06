import { Router } from 'express';
import { asyncHandler } from '../middleware/auth';

export const syncRoutes = Router();

// POST /api/v1/sync/pull
syncRoutes.post(
  '/pull',
  asyncHandler(async (req, res) => {
    res.json({
      success: true,
      message: 'Pull sync endpoint - coming soon',
    });
  })
);

// POST /api/v1/sync/push
syncRoutes.post(
  '/push',
  asyncHandler(async (req, res) => {
    res.json({
      success: true,
      message: 'Push sync endpoint - coming soon',
    });
  })
);
