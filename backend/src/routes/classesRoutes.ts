import { Router } from 'express';
import { asyncHandler } from '../middleware/auth';

export const classesRoutes = Router();

// GET /api/v1/classes
classesRoutes.get(
  '/',
  asyncHandler(async (req, res) => {
    res.json({
      success: true,
      message: 'Get classes endpoint - coming soon',
    });
  })
);

// POST /api/v1/classes
classesRoutes.post(
  '/',
  asyncHandler(async (req, res) => {
    res.json({
      success: true,
      message: 'Create class endpoint - coming soon',
    });
  })
);
