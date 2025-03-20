import { Request, Response, NextFunction } from 'express';

interface ErrorWithStatus extends Error {
  status?: number;
}

export const errorHandler = (
  err: ErrorWithStatus, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  console.error('Unhandled Error:', err);

  const statusCode = err.status || 500;
  const errorResponse = {
    error: 'Internal Server Error',
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  res.status(statusCode).json(errorResponse);
};