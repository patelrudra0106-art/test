import { Request, Response, NextFunction } from 'express';
import { MulterError } from 'multer';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('[API Error]:', err.message);

  if (err instanceof MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(413).json({
        success: false,
        error: 'Payload Too Large',
        message: 'File size exceeds maximum allowable limit of 5MB.',
      });
      return;
    }

    res.status(400).json({
      success: false,
      error: 'Upload Error',
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message:
      process.env.NODE_ENV === 'development'
        ? err.message
        : 'An unexpected system error occurred. Please try again later.',
  });
};

