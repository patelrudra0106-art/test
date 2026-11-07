"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentUploadParamsSchema = void 0;
const zod_1 = require("zod");
exports.documentUploadParamsSchema = zod_1.z.object({
    applicationId: zod_1.z.string().uuid('Application ID must be a valid UUID'),
    documentType: zod_1.z.enum([
        'Caste_Certificate',
        'Income_Certificate',
        'Marksheet',
        'Fee_Receipt',
        'Bank_Passbook',
        'Aadhaar_Card',
    ]),
});
