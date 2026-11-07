import { Router } from 'express';
import { DisbursementsController } from '../controllers/disbursements.controller.js';
import { requireAuth } from '../middlewares/auth.js';
import { requireRole } from '../middlewares/rbac.js';

export const disbursementsRouter = Router();

disbursementsRouter.use(requireAuth);

// Direct Benefit Transfer trigger reserved for District Officer or Admin
disbursementsRouter.post(
  '/trigger',
  requireRole(['District Officer', 'Admin']),
  DisbursementsController.triggerDisbursement
);

// All authenticated roles (including student) can query transaction status
disbursementsRouter.get('/track/:transactionId', DisbursementsController.trackStatus);

