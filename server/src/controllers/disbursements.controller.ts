import { Request, Response } from 'express';
import { PfmsService } from '../services/pfms.service.js';
import { SupabaseService } from '../services/supabase.service.js';

export class DisbursementsController {
  static async triggerDisbursement(req: Request, res: Response): Promise<void> {
    const { applicationId, amountInr } = req.body;

    const application = await SupabaseService.getApplicationById(applicationId);
    if (!application) {
      res.status(404).json({ success: false, error: 'Not Found', message: 'Application not found.' });
      return;
    }

    if (application.status !== 'Officer_Approved') {
      res.status(400).json({
        success: false,
        error: 'Invalid State',
        message: 'Only officer-approved applications can be queued for PFMS disbursement.',
      });
      return;
    }

    const disbursement = await PfmsService.initiateDisbursement(applicationId, amountInr || 15000);

    await SupabaseService.updateApplicationStatus(
      applicationId,
      'PFMS_Disbursed',
      undefined,
      disbursement.pfmsTransactionId
    );

    res.json({
      success: true,
      message: 'Direct Benefit Transfer grant successfully initiated via PFMS gateway.',
      data: disbursement,
    });
  }

  static async trackStatus(req: Request, res: Response): Promise<void> {
    const { transactionId } = req.params;
    const status = await PfmsService.trackDisbursementStatus(transactionId);

    res.json({
      success: true,
      data: {
        transactionId,
        ...status,
      },
    });
  }
}

