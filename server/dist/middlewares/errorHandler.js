"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const multer_1 = require("multer");
const errorHandler = (err, _req, res, _next) => {
    console.error('[API Error]:', err.message);
    if (err instanceof multer_1.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            res.status(413).json({
                success: false,
                error: 'Payload Too Large',
                message: 'File size exceeds maximum allowable limit of 5MB.',
            });
            return;
        }
        res.status(400).json({
            success: false,
            error: 'Upload Error',
            message: err.message,
        });
        return;
    }
    res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development'
            ? err.message
            : 'An unexpected system error occurred. Please try again later.',
    });
};
exports.errorHandler = errorHandler;
