import { Request, Response } from 'express';
import { SupabaseService } from '../services/supabase.service.js';

export class InstitutesController {
  static async getPendingApplications(_req: Request, res: Response): Promise<void> {
    const all = await SupabaseService.getAllApplications();
    const pending = all.filter((a) => a.status === 'Submitted');

    res.json({
      success: true,
      data: pending,
      total: pending.length,
    });
  }

  static async verifyApplication(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { approved, rejectionReason } = req.body;

    const newStatus = approved ? 'Institute_Verified' : 'Rejected';
    const updated = await SupabaseService.updateApplicationStatus(id, newStatus, rejectionReason);

    if (!updated) {
      res.status(404).json({ success: false, error: 'Not Found', message: 'Application not found.' });
      return;
    }

    res.json({
      success: true,
      message: `Application ${approved ? 'endorsed and forwarded to District Officer' : 'rejected'}.`,
      data: updated,
    });
  }
}

