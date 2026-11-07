import { Request, Response } from 'express';
import { SupabaseService } from '../services/supabase.service.js';
import { UserProfile } from '../types/index.js';

export class AuthController {
  static async getMe(req: Request, res: Response): Promise<void> {
    const auth = req.auth;
    if (!auth) {
      res.status(401).json({ success: false, error: 'Unauthorized' });
      return;
    }

    const profile = await SupabaseService.getUserProfile(auth.userId);

    res.json({
      success: true,
      data: profile || {
        id: auth.userId,
        email: auth.email,
        fullName: auth.fullName || 'User',
        role: auth.role,
        isActive: true,
      },
    });
  }

  static async syncProfile(req: Request, res: Response): Promise<void> {
    const auth = req.auth;
    if (!auth) {
      res.status(401).json({ success: false, error: 'Unauthorized' });
      return;
    }

    const { fullName, phoneNumber, casteCategory, district, role } = req.body;

    const profile: UserProfile = {
      id: auth.userId,
      email: auth.email,
      fullName: fullName || auth.fullName || 'User',
      phoneNumber,
      role: role || auth.role || 'Student',
      casteCategory,
      district,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const synced = await SupabaseService.syncUserProfile(profile);

    res.json({
      success: true,
      message: 'User profile successfully synchronized with database.',
      data: synced,
    });
  }
}

