"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitutesController = void 0;
const supabase_service_js_1 = require("../services/supabase.service.js");
class InstitutesController {
    static async getPendingApplications(_req, res) {
        const all = await supabase_service_js_1.SupabaseService.getAllApplications();
        const pending = all.filter((a) => a.status === 'Submitted');
        res.json({
            success: true,
            data: pending,
            total: pending.length,
        });
    }
    static async verifyApplication(req, res) {
        const { id } = req.params;
        const { approved, rejectionReason } = req.body;
        const newStatus = approved ? 'Institute_Verified' : 'Rejected';
        const updated = await supabase_service_js_1.SupabaseService.updateApplicationStatus(id, newStatus, rejectionReason);
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
exports.InstitutesController = InstitutesController;
