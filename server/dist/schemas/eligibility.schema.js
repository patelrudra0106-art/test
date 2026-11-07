"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEligibilitySchema = void 0;
const zod_1 = require("zod");
exports.checkEligibilitySchema = zod_1.z.object({
    category: zod_1.z.enum(['OBC', 'SC', 'ST', 'General'], {
        errorMap: () => ({ message: 'Category must be OBC, SC, ST, or General' }),
    }),
    stateDomicile: zod_1.z.enum(['Gujarat', 'Other'], {
        errorMap: () => ({ message: 'State domicile must be Gujarat or Other' }),
    }),
    annualIncome: zod_1.z.enum(['below-2.5', '2.5-to-6', 'above-6'], {
        errorMap: () => ({ message: 'Income must be below-2.5, 2.5-to-6, or above-6' }),
    }),
    educationLevel: zod_1.z.enum(['school', 'diploma', 'undergraduate', 'postgraduate'], {
        errorMap: () => ({ message: 'Invalid education level selected' }),
    }),
    institutionType: zod_1.z.enum(['government', 'grant-in-aid', 'self-financed']).default('government'),
    hostelStatus: zod_1.z.enum(['day-scholar', 'hosteller']).default('day-scholar'),
    gender: zod_1.z.enum(['female', 'male', 'other']).optional(),
});
