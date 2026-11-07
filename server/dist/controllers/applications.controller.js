"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsController = void 0;
const supabase_service_js_1 = require("../services/supabase.service.js");
const pfms_service_js_1 = require("../services/pfms.service.js");
class ApplicationsController {
    static async create(req, res) {
        const auth = req.auth;
        if (!auth) {
            res.status(401).json({ success: false, error: 'Unauthorized' });
            return;
        }
        const { schemeId, academicYear, annualIncomeInr, institutionName, courseName, bankAccountNo, ifscCode, } = req.body;
        // Verify bank account via PFMS integration first
        const bankCheck = await pfms_service_js_1.PfmsService.verifyBankAccount(bankAccountNo, ifscCode);
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
        const application = await supabase_service_js_1.SupabaseService.createApplication({
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
    static async getMyApplications(req, res) {
        const auth = req.auth;
        if (!auth) {
            res.status(401).json({ success: false, error: 'Unauthorized' });
            return;
        }
        const applications = await supabase_service_js_1.SupabaseService.getApplicationsByStudent(auth.userId);
        res.json({
            success: true,
            data: applications,
            total: applications.length,
        });
    }
    static async getById(req, res) {
        const { id } = req.params;
        const application = await supabase_service_js_1.SupabaseService.getApplicationById(id);
        if (!application) {
            res.status(404).json({ success: false, error: 'Not Found', message: 'Application not found.' });
            return;
        }
        // Authorization check: students can only view their own
        if (req.auth?.role === 'Student' && application.studentId !== req.auth.userId) {
            res.status(403).json({ success: false, error: 'Forbidden', message: 'Access denied.' });
            return;
        }
        const documents = await supabase_service_js_1.SupabaseService.getDocumentsByApplication(id);
        res.json({
            success: true,
            data: {
                ...application,
                documents,
            },
        });
    }
}
exports.ApplicationsController = ApplicationsController;
