import { z } from 'zod';

export const checkEligibilitySchema = z.object({
  category: z.enum(['OBC', 'SC', 'ST', 'General'], {
    errorMap: () => ({ message: 'Category must be OBC, SC, ST, or General' }),
  }),
  stateDomicile: z.enum(['Gujarat', 'Other'], {
    errorMap: () => ({ message: 'State domicile must be Gujarat or Other' }),
  }),
  annualIncome: z.enum(['below-2.5', '2.5-to-6', 'above-6'], {
    errorMap: () => ({ message: 'Income must be below-2.5, 2.5-to-6, or above-6' }),
  }),
  educationLevel: z.enum(['school', 'diploma', 'undergraduate', 'postgraduate'], {
    errorMap: () => ({ message: 'Invalid education level selected' }),
  }),
  institutionType: z.enum(['government', 'grant-in-aid', 'self-financed']).default('government'),
  hostelStatus: z.enum(['day-scholar', 'hosteller']).default('day-scholar'),
  gender: z.enum(['female', 'male', 'other']).optional(),
});

export type CheckEligibilityInput = z.infer<typeof checkEligibilitySchema>;

