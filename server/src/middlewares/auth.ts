import { Request, Response, NextFunction } from 'express';
import { clerk } from '../config/clerk.js';
import { env } from '../config/env.js';
import { UserRole } from '../types/index.js';

export interface AuthContext {
  userId: string;
  role: UserRole;
  email: string;
  fullName?: string;
}

declare global {
  namespace Express {
    interface Request {
      auth?: AuthContext;
    }
  }
}

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'Missing or malformed Authorization header with Bearer token.',
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    // In development mode, allow dev test tokens
    if (env.NODE_ENV === 'development' && token.startsWith('dev_token_')) {
      const parts = token.split('_');
      const role = (parts[2] as UserRole) || 'Student';
      req.auth = {
        userId: `dev_user_${role.toLowerCase().replace(/\s+/g, '_')}`,
        role: role,
        email: `${role.toLowerCase().replace(/\s+/g, '_')}@vidyapragati.gov.in`,
        fullName: `Dev ${role} User`,
      };
      next();
      return;
    }

    // Official Clerk JWT Token Verification
    const sessionClaims = await clerk.verifyToken(token);
    const userId = sessionClaims.sub;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Invalid session token: missing subject claim.',
      });
      return;
    }

    const user = await clerk.users.getUser(userId);
    const email = user.emailAddresses[0]?.emailAddress ?? '';
    const role = (user.publicMetadata?.role as UserRole) || 'Student';
    const fullName = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || 'Verified Student';

    req.auth = {
      userId,
      role,
      email,
      fullName,
    };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'Token verification failed or session expired.',
    });
  }
};

