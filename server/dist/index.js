"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = require("./app.js");
const env_js_1 = require("./config/env.js");
const app = (0, app_js_1.createApp)();
const server = app.listen(env_js_1.env.PORT, () => {
    console.log(`====================================================`);
    console.log(` Vidya Pragati Setu — Backend REST Service Started`);
    console.log(` Environment : ${env_js_1.env.NODE_ENV}`);
    console.log(` Port        : ${env_js_1.env.PORT}`);
    console.log(` Health URL  : http://localhost:${env_js_1.env.PORT}/api/v1/health`);
    console.log(`====================================================`);
});
// Graceful shutdown handling
const handleShutdown = (signal) => {
    console.log(`\nReceived ${signal}. Gracefully shutting down Vidya Pragati Setu API...`);
    server.close(() => {
        console.log('HTTP server closed successfully.');
        process.exit(0);
    });
};
process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));
