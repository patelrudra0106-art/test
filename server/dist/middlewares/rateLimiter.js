"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.strictRateLimiter = exports.globalRateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const env_js_1 = require("../config/env.js");
exports.globalRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: env_js_1.env.RATE_LIMIT_WINDOW_MS,
    max: env_js_1.env.RATE_LIMIT_MAX,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please wait 15 minutes before retrying.',
    },
});
exports.strictRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        error: 'Too Many Requests',
        message: 'Too many sensitive operations requested. Please try again later.',
    },
});
