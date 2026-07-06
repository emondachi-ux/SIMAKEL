import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler';
import { JWTPayload } from '../types';

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new AppError('UNAUTHORIZED', 401, 'No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as JWTPayload;
    req.user = decoded;
    next();
  } catch (error) {
    throw new AppError('UNAUTHORIZED', 401, 'Invalid token');
  }
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
