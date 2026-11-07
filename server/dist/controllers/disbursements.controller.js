"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisbursementsController = void 0;
const pfms_service_js_1 = require("../services/pfms.service.js");
const supabase_service_js_1 = require("../services/supabase.service.js");
class DisbursementsController {
    static async triggerDisbursement(req, res) {
        const { applicationId, amountInr } = req.body;
        const application = await supabase_service_js_1.SupabaseService.getApplicationById(applicationId);
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
        const disbursement = await pfms_service_js_1.PfmsService.initiateDisbursement(applicationId, amountInr || 15000);
        await supabase_service_js_1.SupabaseService.updateApplicationStatus(applicationId, 'PFMS_Disbursed', undefined, disbursement.pfmsTransactionId);
        res.json({
            success: true,
            message: 'Direct Benefit Transfer grant successfully initiated via PFMS gateway.',
            data: disbursement,
        });
    }
    static async trackStatus(req, res) {
        const { transactionId } = req.params;
        const status = await pfms_service_js_1.PfmsService.trackDisbursementStatus(transactionId);
        res.json({
            success: true,
            data: {
                transactionId,
                ...status,
            },
        });
    }
}
exports.DisbursementsController = DisbursementsController;
