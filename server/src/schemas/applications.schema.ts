import { z } from 'zod';

export const createApplicationSchema = z.object({
  schemeId: z.string().min(1, 'Scheme ID is required'),
  academicYear: z.string().regex(/^\d{4}-\d{2,4}$/, 'Format must be YYYY-YY or YYYY-YYYY (e.g. 2026-27)'),
  annualIncomeInr: z.number().positive('Annual income must be positive'),
  institutionName: z.string().min(3, 'Institution name must be at least 3 characters'),
  courseName: z.string().min(2, 'Course name must be at least 2 characters'),
  bankAccountNo: z.string().min(9, 'Bank account number must be at least 9 digits').max(18),
  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid Indian IFSC code format (e.g. SBIN0001234)'),
});

export const updateApplicationStatusSchema = z.object({
  status: z.enum(['Submitted', 'Institute_Verified', 'Officer_Approved', 'PFMS_Disbursed', 'Rejected']),
  rejectionReason: z.string().optional(),
  pfmsTransactionId: z.string().optional(),
});

