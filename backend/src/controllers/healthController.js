/**
 * Health & Diagnostics Controller
 */
const { getDatabaseStatus } = require('../config/database');

const startTime = Date.now();

function getHealth(req, res) {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
  const dbStatus = getDatabaseStatus();

  res.status(200).json({
    status: 'ok',
    service: 'rashi-portfolio-backend-api',
    uptimeSeconds,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    nodeVersion: process.version,
    database: dbStatus
  });
}

module.exports = {
  getHealth
};
