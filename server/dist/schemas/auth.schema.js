"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRoleSchema = exports.syncUserSchema = void 0;
const zod_1 = require("zod");
exports.syncUserSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(2, 'Full name must be at least 2 characters'),
    phoneNumber: zod_1.z.string().optional(),
    casteCategory: zod_1.z.enum(['OBC', 'SC', 'ST', 'General']).optional(),
    district: zod_1.z.string().optional(),
    role: zod_1.z.enum(['Student', 'Institute', 'District Officer', 'Admin']).default('Student'),
});
exports.updateUserRoleSchema = zod_1.z.object({
    userId: zod_1.z.string().min(1, 'User ID is required'),
    role: zod_1.z.enum(['Student', 'Institute', 'District Officer', 'Admin']),
});
