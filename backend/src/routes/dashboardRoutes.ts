import { Router } from 'express';
import { asyncHandler } from '../middleware/auth';

export const dashboardRoutes = Router();

// GET /api/v1/dashboard
dashboardRoutes.get(
  '/',
  asyncHandler(async (req, res) => {
    res.json({
      success: true,
      message: 'Get dashboard endpoint - coming soon',
    });
  })
);
