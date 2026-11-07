import { Router } from 'express';
import { ApplicationsController } from '../controllers/applications.controller.js';
import { requireAuth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { createApplicationSchema } from '../schemas/applications.schema.js';

export const applicationsRouter = Router();

applicationsRouter.post(
  '/',
  requireAuth,
  validate(createApplicationSchema),
  ApplicationsController.create
);
applicationsRouter.get('/my', requireAuth, ApplicationsController.getMyApplications);
applicationsRouter.get('/:id', requireAuth, ApplicationsController.getById);

