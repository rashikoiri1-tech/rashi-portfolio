/**
 * In-Memory Sliding Window Rate Limiter Middleware
 * Protects endpoints from flooding without third-party dependencies.
 */
const config = require('../config/serverConfig');

const ipRequests = new Map();

// Periodic cleanup of stale IP records every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of ipRequests.entries()) {
    const validTimestamps = timestamps.filter(t => now - t < config.rateLimit.windowMs);
    if (validTimestamps.length === 0) {
      ipRequests.delete(ip);
    } else {
      ipRequests.set(ip, validTimestamps);
    }
  }
}, 5 * 60 * 1000).unref();

function rateLimiter(req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown-ip';
  const now = Date.now();
  const windowStart = now - config.rateLimit.windowMs;

  const timestamps = (ipRequests.get(ip) || []).filter(t => t > windowStart);

  if (timestamps.length >= config.rateLimit.maxRequests) {
    const retryAfterSeconds = Math.ceil((timestamps[0] + config.rateLimit.windowMs - now) / 1000);
    res.setHeader('Retry-After', retryAfterSeconds);
    return res.status(429).json({
      success: false,
      error: 'RATE_LIMIT_EXCEEDED',
      message: `Too many requests from this address. Please wait ${retryAfterSeconds} seconds before trying again.`
    });
  }

  timestamps.push(now);
  ipRequests.set(ip, timestamps);
  next();
}

module.exports = rateLimiter;
