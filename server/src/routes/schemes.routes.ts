import { Router } from 'express';
import { SchemesController } from '../controllers/schemes.controller.js';

export const schemesRouter = Router();

schemesRouter.get('/', SchemesController.getAll);
schemesRouter.get('/:id', SchemesController.getById);

