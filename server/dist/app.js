"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const env_js_1 = require("./config/env.js");
const rateLimiter_js_1 = require("./middlewares/rateLimiter.js");
const errorHandler_js_1 = require("./middlewares/errorHandler.js");
const index_js_1 = require("./routes/index.js");
function createApp() {
    const app = (0, express_1.default)();
    // 1. Security Headers (Content Security Policy)
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ["'self'", 'data:', 'https:'],
                connectSrc: ["'self'", env_js_1.env.CLIENT_URL, 'https://*.supabase.co', 'https://*.clerk.accounts.dev'],
            },
        },
        crossOriginEmbedderPolicy: false,
    }));
    // 2. Cross-Origin Resource Sharing (CORS)
    app.use((0, cors_1.default)({
        origin: [env_js_1.env.CLIENT_URL, 'http://localhost:5173', 'http://localhost:3000'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    }));
    // 3. Global Rate Limiter
    app.use(rateLimiter_js_1.globalRateLimiter);
    // 4. Request Logging
    if (env_js_1.env.NODE_ENV !== 'test') {
        app.use((0, morgan_1.default)(env_js_1.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
    }
    // 5. Body Parsers
    app.use(express_1.default.json({ limit: '2mb' }));
    app.use(express_1.default.urlencoded({ extended: true, limit: '2mb' }));
    // 6. Direct Root Health Check
    app.get('/', (_req, res) => {
        res.json({
            name: 'Vidya Pragati Setu API',
            status: 'ONLINE',
            version: '1.0.0',
            documentation: '/api/v1/health',
        });
    });
    // 7. API Version 1 Routes
    app.use('/api/v1', index_js_1.apiRouter);
    // 8. 404 Route Handler
    app.use((req, res) => {
        res.status(404).json({
            success: false,
            error: 'Not Found',
            message: `The requested endpoint '${req.method} ${req.originalUrl}' does not exist.`,
        });
    });
    // 9. Centralized Error Handler
    app.use(errorHandler_js_1.errorHandler);
    return app;
}
