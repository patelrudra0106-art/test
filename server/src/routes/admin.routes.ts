import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller.js';
import { requireAuth } from '../middlewares/auth.js';
import { requireRole } from '../middlewares/rbac.js';

export const adminRouter = Router();

adminRouter.use(requireAuth);
adminRouter.use(requireRole(['District Officer', 'Admin']));

adminRouter.get('/analytics', AdminController.getAnalytics);
adminRouter.post('/applications/:id/review', AdminController.approveApplication);

