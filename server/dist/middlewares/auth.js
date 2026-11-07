"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const clerk_js_1 = require("../config/clerk.js");
const env_js_1 = require("../config/env.js");
const requireAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({
            success: false,
            error: 'Unauthorized',
            message: 'Missing or malformed Authorization header with Bearer token.',
        });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        // In development mode, allow dev test tokens
        if (env_js_1.env.NODE_ENV === 'development' && token.startsWith('dev_token_')) {
            const parts = token.split('_');
            const role = parts[2] || 'Student';
            req.auth = {
                userId: `dev_user_${role.toLowerCase().replace(/\s+/g, '_')}`,
                role: role,
                email: `${role.toLowerCase().replace(/\s+/g, '_')}@vidyapragati.gov.in`,
                fullName: `Dev ${role} User`,
            };
            next();
            return;
        }
        // Official Clerk JWT Token Verification
        const sessionClaims = await clerk_js_1.clerk.verifyToken(token);
        const userId = sessionClaims.sub;
        if (!userId) {
            res.status(401).json({
                success: false,
                error: 'Unauthorized',
                message: 'Invalid session token: missing subject claim.',
            });
            return;
        }
        const user = await clerk_js_1.clerk.users.getUser(userId);
        const email = user.emailAddresses[0]?.emailAddress ?? '';
        const role = user.publicMetadata?.role || 'Student';
        const fullName = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || 'Verified Student';
        req.auth = {
            userId,
            role,
            email,
            fullName,
        };
        next();
    }
    catch (error) {
        res.status(401).json({
            success: false,
            error: 'Unauthorized',
            message: 'Token verification failed or session expired.',
        });
    }
};
exports.requireAuth = requireAuth;
