import { Router } from 'express';
import { EligibilityController } from '../controllers/eligibility.controller.js';
import { validate } from '../middlewares/validate.js';
import { checkEligibilitySchema } from '../schemas/eligibility.schema.js';

export const eligibilityRouter = Router();

eligibilityRouter.post(
  '/evaluate',
  validate(checkEligibilitySchema),
  EligibilityController.evaluate
);

