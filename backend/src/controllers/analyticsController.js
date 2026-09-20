/**
 * Analytics Controller
 * Tracks page visits into MySQL or in-memory array.
 */
const crypto = require('crypto');
const db = require('../config/database');

const inMemoryVisits = [];

async function recordVisit(req, res, next) {
  try {
    const { page = '/' } = req.body;
    const userAgent = (req.headers['user-agent'] || '').slice(0, 250);
    const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const ipHash = crypto.createHash('sha256').update(rawIp).digest('hex').substring(0, 16);

    let recordedInDb = false;

    try {
      await db.query(
        'INSERT INTO analytics (page, user_agent, ip_hash) VALUES (?, ?, ?)',
        [page.slice(0, 100), userAgent, ipHash]
      );
      recordedInDb = true;
    } catch {
      // In-memory fallback
      inMemoryVisits.push({
        page,
        userAgent,
        ipHash,
        visitedAt: new Date().toISOString()
      });
      if (inMemoryVisits.length > 200) inMemoryVisits.shift();
    }

    return res.status(201).json({
      success: true,
      recordedInDb,
      page
    });
  } catch (err) {
    next(err);
  }
}

async function getAnalytics(req, res, next) {
  try {
    try {
      const rows = await db.query('SELECT COUNT(*) as total_views, page, MAX(visited_at) as last_visit FROM analytics GROUP BY page');
      return res.json({
        success: true,
        source: 'MySQL',
        stats: rows
      });
    } catch {
      return res.json({
        success: true,
        source: 'Memory Cache',
        totalVisits: inMemoryVisits.length,
        recent: inMemoryVisits.slice(-10)
      });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  recordVisit,
  getAnalytics
};
