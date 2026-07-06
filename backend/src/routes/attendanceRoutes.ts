import { Router } from 'express';
import { asyncHandler } from '../middleware/auth';

export const attendanceRoutes = Router();

// GET /api/v1/attendance
attendanceRoutes.get(
  '/',
  asyncHandler(async (req, res) => {
    res.json({
      success: true,
      message: 'Get attendance endpoint - coming soon',
    });
  })
);

// POST /api/v1/attendance
attendanceRoutes.post(
  '/',
  asyncHandler(async (req, res) => {
    res.json({
      success: true,
      message: 'Create attendance endpoint - coming soon',
    });
  })
);
