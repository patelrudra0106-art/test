"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    PORT: zod_1.z.string().default('5000').transform((val) => parseInt(val, 10)),
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    CLIENT_URL: zod_1.z.string().default('http://localhost:5173'),
    // Clerk
    CLERK_SECRET_KEY: zod_1.z.string().optional().default('sk_test_mock_clerk_key_for_dev'),
    CLERK_PUBLISHABLE_KEY: zod_1.z.string().optional().default('pk_test_mock_key'),
    CLERK_JWT_KEY: zod_1.z.string().optional(),
    // Supabase
    SUPABASE_URL: zod_1.z.string().url().optional().default('https://mock-supabase.supabase.co'),
    SUPABASE_ANON_KEY: zod_1.z.string().optional().default('mock-anon-key'),
    SUPABASE_SERVICE_ROLE_KEY: zod_1.z.string().optional().default('mock-service-role-key'),
    SUPABASE_DOCUMENTS_BUCKET: zod_1.z.string().default('documents-private'),
    // PFMS Integration
    PFMS_API_ENDPOINT: zod_1.z.string().optional().default('https://pfms.nic.in/api/v1'),
    PFMS_CLIENT_ID: zod_1.z.string().optional().default('pfms_dev_client'),
    PFMS_CLIENT_SECRET: zod_1.z.string().optional().default('pfms_dev_secret'),
    PFMS_SANDBOX_MODE: zod_1.z
        .string()
        .default('true')
        .transform((val) => val === 'true'),
    // Security
    RATE_LIMIT_WINDOW_MS: zod_1.z.string().default('900000').transform((val) => parseInt(val, 10)),
    RATE_LIMIT_MAX: zod_1.z.string().default('100').transform((val) => parseInt(val, 10)),
});
const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
    console.error('Invalid environment variables detected:', parsedEnv.error.format());
    process.exit(1);
}
exports.env = parsedEnv.data;
