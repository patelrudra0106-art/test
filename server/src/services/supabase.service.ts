import { supabase } from '../config/supabase.js';
import { env } from '../config/env.js';
import { Application, ApplicationDocument, UserProfile } from '../types/index.js';
import crypto from 'node:crypto';

// In-memory fallback repository for local offline development or mock Supabase instances
const memoryApplications: Map<string, Application> = new Map();
const memoryDocuments: Map<string, ApplicationDocument> = new Map();
const memoryUsers: Map<string, UserProfile> = new Map();

export class SupabaseService {
  /**
   * Upload an encrypted document buffer to Supabase Storage
   */
  static async uploadDocument(
    fileBuffer: Buffer,
    fileName: string,
    mimeType: string,
    folder: string = 'applications'
  ): Promise<string> {
    const fileExtension = fileName.split('.').pop() || 'bin';
    const uniqueKey = `${folder}/${crypto.randomUUID()}.${fileExtension}`;

    // If using live Supabase credentials
    if (!env.SUPABASE_URL.includes('mock-supabase')) {
      const { data, error } = await supabase.storage
        .from(env.SUPABASE_DOCUMENTS_BUCKET)
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
    return `mock-storage://${env.SUPABASE_DOCUMENTS_BUCKET}/${uniqueKey}`;
  }

  /**
   * Upsert a user profile synced from Clerk
   */
  static async syncUserProfile(user: UserProfile): Promise<UserProfile> {
    memoryUsers.set(user.id, user);

    if (!env.SUPABASE_URL.includes('mock-supabase')) {
      await supabase.from('users').upsert({
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

  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    return memoryUsers.get(userId) || null;
  }

  /**
   * Applications CRUD
   */
  static async createApplication(app: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>): Promise<Application> {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    const newApp: Application = {
      ...app,
      id,
      createdAt: now,
      updatedAt: now,
    };

    memoryApplications.set(id, newApp);

    if (!env.SUPABASE_URL.includes('mock-supabase')) {
      await supabase.from('applications').insert({
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

  static async getApplicationById(id: string): Promise<Application | null> {
    return memoryApplications.get(id) || null;
  }

  static async getApplicationsByStudent(studentId: string): Promise<Application[]> {
    return Array.from(memoryApplications.values()).filter((app) => app.studentId === studentId);
  }

  static async getAllApplications(): Promise<Application[]> {
    return Array.from(memoryApplications.values());
  }

  static async updateApplicationStatus(
    id: string,
    status: Application['status'],
    rejectionReason?: string,
    pfmsTransactionId?: string
  ): Promise<Application | null> {
    const app = memoryApplications.get(id);
    if (!app) return null;

    app.status = status;
    app.updatedAt = new Date().toISOString();
    if (rejectionReason) app.rejectionReason = rejectionReason;
    if (pfmsTransactionId) app.pfmsTransactionId = pfmsTransactionId;

    memoryApplications.set(id, app);
    return app;
  }

  /**
   * Application Documents
   */
  static async recordDocument(doc: Omit<ApplicationDocument, 'id' | 'uploadedAt'>): Promise<ApplicationDocument> {
    const id = crypto.randomUUID();
    const newDoc: ApplicationDocument = {
      ...doc,
      id,
      uploadedAt: new Date().toISOString(),
    };

    memoryDocuments.set(id, newDoc);
    return newDoc;
  }

  static async getDocumentsByApplication(applicationId: string): Promise<ApplicationDocument[]> {
    return Array.from(memoryDocuments.values()).filter((d) => d.applicationId === applicationId);
  }
}

