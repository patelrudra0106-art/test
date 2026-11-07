import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../types/index.js';

export const requireRole = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRole = req.auth?.role;

    if (!userRole) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Authentication context missing.',
      });
      return;
    }

    if (!allowedRoles.includes(userRole)) {
      res.status(403).json({
        success: false,
        error: 'Forbidden',
        message: `Role '${userRole}' does not have permission to access this endpoint. Required: [${allowedRoles.join(', ')}]`,
      });
      return;
    }

    next();
  };
};

