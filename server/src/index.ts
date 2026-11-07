import { createApp } from './app.js';
import { env } from './config/env.js';

const app = createApp();

const server = app.listen(env.PORT, () => {
  console.log(`====================================================`);
  console.log(` Vidya Pragati Setu — Backend REST Service Started`);
  console.log(` Environment : ${env.NODE_ENV}`);
  console.log(` Port        : ${env.PORT}`);
  console.log(` Health URL  : http://localhost:${env.PORT}/api/v1/health`);
  console.log(`====================================================`);
});

// Graceful shutdown handling
const handleShutdown = (signal: string) => {
  console.log(`\nReceived ${signal}. Gracefully shutting down Vidya Pragati Setu API...`);
  server.close(() => {
    console.log('HTTP server closed successfully.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

