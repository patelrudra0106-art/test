import { z } from 'zod';

export const documentUploadParamsSchema = z.object({
  applicationId: z.string().uuid('Application ID must be a valid UUID'),
  documentType: z.enum([
    'Caste_Certificate',
    'Income_Certificate',
    'Marksheet',
    'Fee_Receipt',
    'Bank_Passbook',
    'Aadhaar_Card',
  ]),
});

