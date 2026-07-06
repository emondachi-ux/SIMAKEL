import { Router } from 'express';
import { asyncHandler } from '../middleware/auth';

export const gradesRoutes = Router();

// GET /api/v1/grades
gradesRoutes.get(
  '/',
  asyncHandler(async (req, res) => {
    res.json({
      success: true,
      message: 'Get grades endpoint - coming soon',
    });
  })
);

// POST /api/v1/grades
gradesRoutes.post(
  '/',
  asyncHandler(async (req, res) => {
    res.json({
      success: true,
      message: 'Create grade endpoint - coming soon',
    });
  })
);
