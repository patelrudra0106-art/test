import { Router } from 'express';
import { InstitutesController } from '../controllers/institutes.controller.js';
import { requireAuth } from '../middlewares/auth.js';
import { requireRole } from '../middlewares/rbac.js';

export const institutesRouter = Router();

institutesRouter.use(requireAuth);
institutesRouter.use(requireRole(['Institute', 'District Officer', 'Admin']));

institutesRouter.get('/applications/pending', InstitutesController.getPendingApplications);
institutesRouter.post('/applications/:id/verify', InstitutesController.verifyApplication);

