import { Request, Response } from 'express';
import { SupabaseService } from '../services/supabase.service.js';

export class AdminController {
  static async getAnalytics(_req: Request, res: Response): Promise<void> {
    const all = await SupabaseService.getAllApplications();

    const counts = {
      total: all.length,
      submitted: all.filter((a) => a.status === 'Submitted').length,
      instituteVerified: all.filter((a) => a.status === 'Institute_Verified').length,
      officerApproved: all.filter((a) => a.status === 'Officer_Approved').length,
      pfmsDisbursed: all.filter((a) => a.status === 'PFMS_Disbursed').length,
      rejected: all.filter((a) => a.status === 'Rejected').length,
    };

    res.json({
      success: true,
      data: {
        summary: counts,
        activeSchemesCount: 4,
        districtsCovered: 33,
        systemStatus: 'ONLINE',
      },
    });
  }

  static async approveApplication(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { approved, rejectionReason } = req.body;

    const newStatus = approved ? 'Officer_Approved' : 'Rejected';
    const updated = await SupabaseService.updateApplicationStatus(id, newStatus, rejectionReason);

    if (!updated) {
      res.status(404).json({ success: false, error: 'Not Found', message: 'Application not found.' });
      return;
    }

    res.json({
      success: true,
      message: `District Officer review completed: ${newStatus}`,
      data: updated,
    });
  }
}

