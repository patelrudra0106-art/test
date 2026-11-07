import { z } from 'zod';

export const syncUserSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phoneNumber: z.string().optional(),
  casteCategory: z.enum(['OBC', 'SC', 'ST', 'General']).optional(),
  district: z.string().optional(),
  role: z.enum(['Student', 'Institute', 'District Officer', 'Admin']).default('Student'),
});

export const updateUserRoleSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  role: z.enum(['Student', 'Institute', 'District Officer', 'Admin']),
});

