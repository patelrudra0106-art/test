import { Request, Response } from 'express';
import { SupabaseService } from '../services/supabase.service.js';
import { PfmsService } from '../services/pfms.service.js';

export class ApplicationsController {
  static async create(req: Request, res: Response): Promise<void> {
    const auth = req.auth;
    if (!auth) {
      res.status(401).json({ success: false, error: 'Unauthorized' });
      return;
    }

    const {
      schemeId,
      academicYear,
      annualIncomeInr,
      institutionName,
      courseName,
      bankAccountNo,
      ifscCode,
    } = req.body;

    // Verify bank account via PFMS integration first
    const bankCheck = await PfmsService.verifyBankAccount(bankAccountNo, ifscCode);
    if (!bankCheck.isValid) {
      res.status(400).json({
        success: false,
        error: 'PFMS Bank Verification Failed',
        message: bankCheck.message,
      });
      return;
    }

    // Mask bank account for security (e.g. *******1234)
    const masked = 'X'.repeat(Math.max(0, bankAccountNo.length - 4)) + bankAccountNo.slice(-4);

    const application = await SupabaseService.createApplication({
      studentId: auth.userId,
      schemeId,
      status: 'Submitted',
      academicYear,
      annualIncomeInr,
      institutionName,
      courseName,
      bankAccountNoMasked: masked,
      ifscCode,
      submittedAt: new Date().toISOString(),
    });

    res.status(201).json({
      success: true,
      message: 'Scholarship application successfully submitted.',
      data: application,
    });
  }

  static async getMyApplications(req: Request, res: Response): Promise<void> {
    const auth = req.auth;
    if (!auth) {
      res.status(401).json({ success: false, error: 'Unauthorized' });
      return;
    }

    const applications = await SupabaseService.getApplicationsByStudent(auth.userId);

    res.json({
      success: true,
      data: applications,
      total: applications.length,
    });
  }

  static async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const application = await SupabaseService.getApplicationById(id);

    if (!application) {
      res.status(404).json({ success: false, error: 'Not Found', message: 'Application not found.' });
      return;
    }

    // Authorization check: students can only view their own
    if (req.auth?.role === 'Student' && application.studentId !== req.auth.userId) {
      res.status(403).json({ success: false, error: 'Forbidden', message: 'Access denied.' });
      return;
    }

    const documents = await SupabaseService.getDocumentsByApplication(id);

    res.json({
      success: true,
      data: {
        ...application,
        documents,
      },
    });
  }
}

