import { Router } from 'express';
import { asyncHandler } from '../middleware/auth';

export const studentsRoutes = Router();

// GET /api/v1/students
studentsRoutes.get(
  '/',
  asyncHandler(async (req, res) => {
    res.json({
      success: true,
      message: 'Get students endpoint - coming soon',
    });
  })
);

// POST /api/v1/students
studentsRoutes.post(
  '/',
  asyncHandler(async (req, res) => {
    res.json({
      success: true,
      message: 'Create student endpoint - coming soon',
    });
  })
);
