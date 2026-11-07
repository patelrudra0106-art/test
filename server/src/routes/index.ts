import { Router } from 'express';
import { healthRouter } from './health.routes.js';
import { authRouter } from './auth.routes.js';
import { schemesRouter } from './schemes.routes.js';
import { eligibilityRouter } from './eligibility.routes.js';
import { applicationsRouter } from './applications.routes.js';
import { documentsRouter } from './documents.routes.js';
import { institutesRouter } from './institutes.routes.js';
import { disbursementsRouter } from './disbursements.routes.js';
import { adminRouter } from './admin.routes.js';

export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/schemes', schemesRouter);
apiRouter.use('/eligibility', eligibilityRouter);
apiRouter.use('/applications', applicationsRouter);
apiRouter.use('/documents', documentsRouter);
apiRouter.use('/institutes', institutesRouter);
apiRouter.use('/disbursements', disbursementsRouter);
apiRouter.use('/admin', adminRouter);

