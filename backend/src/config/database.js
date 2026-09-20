/**
 * MySQL Database Connection & Query Helper
 * Connects to 'rashi_portfolio' database with graceful fallback if MySQL is offline.
 */
const mysql = require('mysql2/promise');
const config = require('./serverConfig');

let pool = null;
let isConnected = false;
let connectionAttempted = false;

async function getPool() {
  if (pool) return pool;

  try {
    pool = mysql.createPool({
      host: config.db.host,
      user: config.db.user,
      password: config.db.password,
      database: config.db.database,
      port: config.db.port,
      waitForConnections: config.db.waitForConnections,
      connectionLimit: config.db.connectionLimit,
      queueLimit: config.db.queueLimit,
      connectTimeout: config.db.connectTimeout
    });

    // Verify connection
    const connection = await pool.getConnection();
    isConnected = true;
    connectionAttempted = true;
    console.log(`✅ [DATABASE] Connected successfully to MySQL database "${config.db.database}" at ${config.db.host}:${config.db.port}`);
    connection.release();
    return pool;
  } catch (err) {
    isConnected = false;
    connectionAttempted = true;
    console.warn(`⚠️ [DATABASE] Could not connect to MySQL ("${config.db.database}"): ${err.message}`);
    console.warn('ℹ️ [DATABASE] Running in local fallback mode. Submissions will be safely saved to JSON storage.');
    pool = null;
    return null;
  }
}

async function query(sql, params = []) {
  const activePool = await getPool();
  if (!activePool) {
    throw new Error('DATABASE_OFFLINE');
  }
  const [rows] = await activePool.execute(sql, params);
  return rows;
}

function getDatabaseStatus() {
  return {
    connected: isConnected,
    attempted: connectionAttempted,
    database: config.db.database,
    host: config.db.host,
    port: config.db.port
  };
}

// Initial probe
getPool().catch(() => {});

module.exports = {
  getPool,
  query,
  getDatabaseStatus
};
