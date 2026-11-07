"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = void 0;
const requireRole = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.auth?.role;
        if (!userRole) {
            res.status(401).json({
                success: false,
                error: 'Unauthorized',
                message: 'Authentication context missing.',
            });
            return;
        }
        if (!allowedRoles.includes(userRole)) {
            res.status(403).json({
                success: false,
                error: 'Forbidden',
                message: `Role '${userRole}' does not have permission to access this endpoint. Required: [${allowedRoles.join(', ')}]`,
            });
            return;
        }
        next();
    };
};
exports.requireRole = requireRole;
