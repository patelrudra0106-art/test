import { Router } from 'express';
import { DocumentsController } from '../controllers/documents.controller.js';
import { requireAuth } from '../middlewares/auth.js';
import { upload } from '../middlewares/upload.js';

export const documentsRouter = Router();

documentsRouter.post(
  '/upload',
  requireAuth,
  upload.single('document'),
  DocumentsController.upload
);

documentsRouter.get(
  '/application/:applicationId',
  requireAuth,
  DocumentsController.getDocuments
);

