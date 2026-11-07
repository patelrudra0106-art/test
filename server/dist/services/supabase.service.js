"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseService = void 0;
const supabase_js_1 = require("../config/supabase.js");
const env_js_1 = require("../config/env.js");
const node_crypto_1 = __importDefault(require("node:crypto"));
// In-memory fallback repository for local offline development or mock Supabase instances
const memoryApplications = new Map();
const memoryDocuments = new Map();
const memoryUsers = new Map();
class SupabaseService {
    /**
     * Upload an encrypted document buffer to Supabase Storage
     */
    static async uploadDocument(fileBuffer, fileName, mimeType, folder = 'applications') {
        const fileExtension = fileName.split('.').pop() || 'bin';
        const uniqueKey = `${folder}/${node_crypto_1.default.randomUUID()}.${fileExtension}`;
        // If using live Supabase credentials
        if (!env_js_1.env.SUPABASE_URL.includes('mock-supabase')) {
            const { data, error } = await supabase_js_1.supabase.storage
                .from(env_js_1.env.SUPABASE_DOCUMENTS_BUCKET)
                .upload(uniqueKey, fileBuffer, {
                contentType: mimeType,
                upsert: false,
            });
            if (error) {
                throw new Error(`Supabase Storage upload failed: ${error.message}`);
            }
            return data.path;
        }
        // In dev / mock mode, return standard storage path
        return `mock-storage://${env_js_1.env.SUPABASE_DOCUMENTS_BUCKET}/${uniqueKey}`;
    }
    /**
     * Upsert a user profile synced from Clerk
     */
    static async syncUserProfile(user) {
        memoryUsers.set(user.id, user);
        if (!env_js_1.env.SUPABASE_URL.includes('mock-supabase')) {
            await supabase_js_1.supabase.from('users').upsert({
                id: user.id,
                email: user.email,
                full_name: user.fullName,
                phone_number: user.phoneNumber,
                role: user.role,
                caste_category: user.casteCategory,
                district: user.district,
                is_active: user.isActive,
            });
        }
        return user;
    }
    static async getUserProfile(userId) {
        return memoryUsers.get(userId) || null;
    }
    /**
     * Applications CRUD
     */
    static async createApplication(app) {
        const id = node_crypto_1.default.randomUUID();
        const now = new Date().toISOString();
        const newApp = {
            ...app,
            id,
            createdAt: now,
            updatedAt: now,
        };
        memoryApplications.set(id, newApp);
        if (!env_js_1.env.SUPABASE_URL.includes('mock-supabase')) {
            await supabase_js_1.supabase.from('applications').insert({
                id: newApp.id,
                student_id: newApp.studentId,
                scheme_id: newApp.schemeId,
                status: newApp.status,
                academic_year: newApp.academicYear,
                annual_income_inr: newApp.annualIncomeInr,
                institution_name: newApp.institutionName,
                course_name: newApp.courseName,
                bank_account_no_masked: newApp.bankAccountNoMasked,
                ifsc_code: newApp.ifscCode,
                submitted_at: newApp.submittedAt,
            });
        }
        return newApp;
    }
    static async getApplicationById(id) {
        return memoryApplications.get(id) || null;
    }
    static async getApplicationsByStudent(studentId) {
        return Array.from(memoryApplications.values()).filter((app) => app.studentId === studentId);
    }
    static async getAllApplications() {
        return Array.from(memoryApplications.values());
    }
    static async updateApplicationStatus(id, status, rejectionReason, pfmsTransactionId) {
        const app = memoryApplications.get(id);
        if (!app)
            return null;
        app.status = status;
        app.updatedAt = new Date().toISOString();
        if (rejectionReason)
            app.rejectionReason = rejectionReason;
        if (pfmsTransactionId)
            app.pfmsTransactionId = pfmsTransactionId;
        memoryApplications.set(id, app);
        return app;
    }
    /**
     * Application Documents
     */
    static async recordDocument(doc) {
        const id = node_crypto_1.default.randomUUID();
        const newDoc = {
            ...doc,
            id,
            uploadedAt: new Date().toISOString(),
        };
        memoryDocuments.set(id, newDoc);
        return newDoc;
    }
    static async getDocumentsByApplication(applicationId) {
        return Array.from(memoryDocuments.values()).filter((d) => d.applicationId === applicationId);
    }
}
exports.SupabaseService = SupabaseService;
