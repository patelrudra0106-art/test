import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { requireAuth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { syncUserSchema } from '../schemas/auth.schema.js';

export const authRouter = Router();

authRouter.get('/me', requireAuth, AuthController.getMe);
authRouter.post('/sync', requireAuth, validate(syncUserSchema), AuthController.syncProfile);

