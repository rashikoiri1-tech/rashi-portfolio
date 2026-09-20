const express = require('express');
const cors = require('cors');
const config = require('./config/serverConfig');
const apiRoutes = require('./routes');
const { notFoundHandler, globalErrorHandler } = require('./middleware/errorHandler');

const app = express();

// Security & CORS Configuration
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (config.clientUrls.includes(origin) || config.clientUrls.includes('*') || config.isDev) {
      return callback(null, true);
    }
    return callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));

// Development Request Logger
if (config.isDev) {
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`[HTTP] ${req.method} ${req.originalUrl} ${res.statusCode} (${duration}ms)`);
    });
    next();
  });
}

// Mount Centralized API Routes
app.use('/api', apiRoutes);

// Root Info Endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Rashi Koiri Portfolio API',
    developer: 'Rashi Koiri',
    academic: 'B.Tech CSE AI/ML — Adamas University',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      projects: 'GET /api/projects',
      projectDetail: 'GET /api/projects/:id',
      contact: 'POST /api/contact',
      submissions: 'GET /api/contact/submissions',
      analytics: 'GET /api/analytics',
      recordVisit: 'POST /api/analytics'
    }
  });
});

// 404 & Centralized Error Middleware
app.use(notFoundHandler);
app.use(globalErrorHandler);

// Start Server
const server = app.listen(config.port, () => {
  console.log(`🚀 [BACKEND] Portfolio API listening on http://localhost:${config.port}`);
  console.log(`📡 [BACKEND] Environment: ${config.nodeEnv}`);
});

// Graceful Shutdown Handler
function handleShutdown(signal) {
  console.log(`\n🛑 [BACKEND] Received ${signal}. Closing HTTP server gracefully...`);
  server.close(() => {
    console.log('✅ [BACKEND] HTTP server closed.');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('⚠️ [BACKEND] Forcefully shutting down.');
    process.exit(1);
  }, 4000).unref();
}

process.on('SIGINT', () => handleShutdown('SIGINT'));
process.on('SIGTERM', () => handleShutdown('SIGTERM'));

module.exports = app;
