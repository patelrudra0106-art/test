import { Request, Response } from 'express';
import { SupabaseService } from '../services/supabase.service.js';
import { DocumentType } from '../types/index.js';

export class DocumentsController {
  static async upload(req: Request, res: Response): Promise<void> {
    const auth = req.auth;
    if (!auth) {
      res.status(401).json({ success: false, error: 'Unauthorized' });
      return;
    }

    const file = req.file;
    if (!file) {
      res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'No file provided in multipart form data (field name: document).',
      });
      return;
    }

    const { applicationId, documentType } = req.body;

    // Verify application exists
    const application = await SupabaseService.getApplicationById(applicationId);
    if (!application) {
      res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'Target application not found.',
      });
      return;
    }

    if (auth.role === 'Student' && application.studentId !== auth.userId) {
      res.status(403).json({
        success: false,
        error: 'Forbidden',
        message: 'Cannot upload documents to another student application.',
      });
      return;
    }

    try {
      // Stream upload to Supabase Storage bucket
      const storagePath = await SupabaseService.uploadDocument(
        file.buffer,
        file.originalname,
        file.mimetype,
        `applications/${applicationId}`
      );

      // Record metadata in database
      const recorded = await SupabaseService.recordDocument({
        applicationId,
        documentType: documentType as DocumentType,
        supabaseStoragePath: storagePath,
        originalFileName: file.originalname,
        fileSizeBytes: file.size,
        mimeType: file.mimetype,
        verifiedByInstitute: false,
      });

      res.status(201).json({
        success: true,
        message: 'Document successfully uploaded and securely stored.',
        data: recorded,
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        error: 'Storage Error',
        message: err.message,
      });
    }
  }

  static async getDocuments(req: Request, res: Response): Promise<void> {
    const { applicationId } = req.params;
    const documents = await SupabaseService.getDocumentsByApplication(applicationId);

    res.json({
      success: true,
      data: documents,
      total: documents.length,
    });
  }
}

