"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateApplicationStatusSchema = exports.createApplicationSchema = void 0;
const zod_1 = require("zod");
exports.createApplicationSchema = zod_1.z.object({
    schemeId: zod_1.z.string().min(1, 'Scheme ID is required'),
    academicYear: zod_1.z.string().regex(/^\d{4}-\d{2,4}$/, 'Format must be YYYY-YY or YYYY-YYYY (e.g. 2026-27)'),
    annualIncomeInr: zod_1.z.number().positive('Annual income must be positive'),
    institutionName: zod_1.z.string().min(3, 'Institution name must be at least 3 characters'),
    courseName: zod_1.z.string().min(2, 'Course name must be at least 2 characters'),
    bankAccountNo: zod_1.z.string().min(9, 'Bank account number must be at least 9 digits').max(18),
    ifscCode: zod_1.z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid Indian IFSC code format (e.g. SBIN0001234)'),
});
exports.updateApplicationStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(['Submitted', 'Institute_Verified', 'Officer_Approved', 'PFMS_Disbursed', 'Rejected']),
    rejectionReason: zod_1.z.string().optional(),
    pfmsTransactionId: zod_1.z.string().optional(),
});
