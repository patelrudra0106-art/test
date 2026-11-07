import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000').transform((val) => parseInt(val, 10)),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  CLIENT_URL: z.string().default('http://localhost:5173'),

  // Clerk
  CLERK_SECRET_KEY: z.string().optional().default('sk_test_mock_clerk_key_for_dev'),
  CLERK_PUBLISHABLE_KEY: z.string().optional().default('pk_test_mock_key'),
  CLERK_JWT_KEY: z.string().optional(),

  // Supabase
  SUPABASE_URL: z.string().url().optional().default('https://mock-supabase.supabase.co'),
  SUPABASE_ANON_KEY: z.string().optional().default('mock-anon-key'),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional().default('mock-service-role-key'),
  SUPABASE_DOCUMENTS_BUCKET: z.string().default('documents-private'),

  // PFMS Integration
  PFMS_API_ENDPOINT: z.string().optional().default('https://pfms.nic.in/api/v1'),
  PFMS_CLIENT_ID: z.string().optional().default('pfms_dev_client'),
  PFMS_CLIENT_SECRET: z.string().optional().default('pfms_dev_secret'),
  PFMS_SANDBOX_MODE: z
    .string()
    .default('true')
    .transform((val) => val === 'true'),

  // Security
  RATE_LIMIT_WINDOW_MS: z.string().default('900000').transform((val) => parseInt(val, 10)),
  RATE_LIMIT_MAX: z.string().default('100').transform((val) => parseInt(val, 10)),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Invalid environment variables detected:', parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;

