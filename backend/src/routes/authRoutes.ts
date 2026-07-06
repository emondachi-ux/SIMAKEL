import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

export const authRoutes = Router();

// POST /api/v1/auth/login
authRoutes.post(
  '/login',
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError('VALIDATION_ERROR', 400, 'Email and password are required');
    }

    // TODO: Implement login logic
    res.json({
      success: true,
      message: 'Login endpoint - coming soon',
    });
  })
);

// POST /api/v1/auth/register
authRoutes.post(
  '/register',
  asyncHandler(async (req: Request, res: Response) => {
    // TODO: Implement register logic
    res.json({
      success: true,
      message: 'Register endpoint - coming soon',
    });
  })
);
