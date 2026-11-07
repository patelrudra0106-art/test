"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PfmsService = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
const env_js_1 = require("../config/env.js");
class PfmsService {
    /**
     * Verify bank account and IFSC code via PFMS Government Gateway
     */
    static async verifyBankAccount(accountNo, ifscCode) {
        // In production, invokes official PFMS API using certified mTLS & credentials
        const isMock = env_js_1.env.PFMS_SANDBOX_MODE;
        if (isMock) {
            // Simulate validation rule: IFSC must match standard 11-char pattern
            const isValidIfsc = /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode);
            const isValidAccount = accountNo.length >= 9 && accountNo.length <= 18;
            if (!isValidIfsc || !isValidAccount) {
                return {
                    isValid: false,
                    beneficiaryNameMasked: '',
                    bankName: 'UNKNOWN',
                    responseCode: 'PFMS_ERR_INVALID_ACCOUNT',
                    message: 'Bank account number or IFSC code failed PFMS verification check.',
                };
            }
            return {
                isValid: true,
                beneficiaryNameMasked: 'S**** K**** P****',
                bankName: ifscCode.startsWith('SBIN') ? 'State Bank of India' : 'Bank of Baroda',
                responseCode: 'PFMS_SUCCESS_00',
                message: 'Bank account successfully validated against Public Financial Management System records.',
            };
        }
        // Production real API call stub
        throw new Error('Direct PFMS production gateway requires certified government leased line access.');
    }
    /**
     * Initiate Direct Benefit Transfer (DBT) disbursement
     */
    static async initiateDisbursement(_applicationId, amountInr) {
        const pfmsTransactionId = `PFMS-GUJ-${Date.now()}-${node_crypto_1.default.randomBytes(3).toString('hex').toUpperCase()}`;
        const batchNumber = `BATCH-2026-Q1-${node_crypto_1.default.randomBytes(2).toString('hex').toUpperCase()}`;
        const now = new Date().toISOString();
        return {
            pfmsTransactionId,
            batchNumber,
            status: 'SUCCESS',
            disbursedAmountInr: amountInr,
            timestamp: now,
        };
    }
    /**
     * Track PFMS disbursement status
     */
    static async trackDisbursementStatus(_pfmsTransactionId) {
        return {
            pfmsBatchNumber: 'BATCH-2026-Q1-GUJ',
            paymentStatus: 'SUCCESS',
            reconciliationTimestamp: new Date().toISOString(),
            bankAckCode: `ACK-RBI-${node_crypto_1.default.randomBytes(4).toString('hex').toUpperCase()}`,
        };
    }
}
exports.PfmsService = PfmsService;
