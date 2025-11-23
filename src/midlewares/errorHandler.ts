import { AppError } from '@shared/AppError';
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  console.error('Internal server error:', error);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};