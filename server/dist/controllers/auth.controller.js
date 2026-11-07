"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const supabase_service_js_1 = require("../services/supabase.service.js");
class AuthController {
    static async getMe(req, res) {
        const auth = req.auth;
        if (!auth) {
            res.status(401).json({ success: false, error: 'Unauthorized' });
            return;
        }
        const profile = await supabase_service_js_1.SupabaseService.getUserProfile(auth.userId);
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
    static async syncProfile(req, res) {
        const auth = req.auth;
        if (!auth) {
            res.status(401).json({ success: false, error: 'Unauthorized' });
            return;
        }
        const { fullName, phoneNumber, casteCategory, district, role } = req.body;
        const profile = {
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
        const synced = await supabase_service_js_1.SupabaseService.syncUserProfile(profile);
        res.json({
            success: true,
            message: 'User profile successfully synchronized with database.',
            data: synced,
        });
    }
}
exports.AuthController = AuthController;
