/**
 * Contact Submission Controller
 * Stores submissions in MySQL database with graceful fallback to local JSON file.
 */
const fs = require('fs');
const path = require('path');
const db = require('../config/database');

const MESSAGES_FILE = path.join(__dirname, '..', '..', 'submissions.json');

async function submitContact(req, res, next) {
  try {
    const { name, email, subject, message } = req.sanitized;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

    let storedInMySQL = false;
    let insertedId = null;

    // 1. Attempt insertion into MySQL
    try {
      const result = await db.query(
        'INSERT INTO contacts (name, email, subject, message, ip_address) VALUES (?, ?, ?, ?, ?)',
        [name, email, subject, message, ip]
      );
      if (result && result.insertId) {
        insertedId = result.insertId;
        storedInMySQL = true;
        console.log(`[CONTACT / MYSQL] Saved submission #${insertedId} from ${name} <${email}>`);
      }
    } catch (dbErr) {
      console.warn(`[CONTACT / FALLBACK] MySQL save bypassed (${dbErr.message}). Writing to local file.`);
    }

    // 2. Also record in local JSON storage as audit log / fallback
    const submissionRecord = {
      id: insertedId ? `mysql_${insertedId}` : `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name,
      email,
      subject,
      message,
      ip,
      savedToMySQL: storedInMySQL,
      createdAt: new Date().toISOString()
    };

    let allSubmissions = [];
    if (fs.existsSync(MESSAGES_FILE)) {
      try {
        allSubmissions = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8'));
      } catch {
        allSubmissions = [];
      }
    }
    allSubmissions.push(submissionRecord);
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(allSubmissions, null, 2), 'utf8');

    console.log(`[CONTACT RECEIVED] From: ${name} <${email}> | Subject: "${subject}" | Storage: ${storedInMySQL ? 'MySQL + File' : 'Local File'}`);

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received successfully. I will get back to you shortly.',
      data: {
        id: submissionRecord.id,
        savedToDatabase: storedInMySQL
      }
    });
  } catch (err) {
    next(err);
  }
}

async function getSubmissions(req, res, next) {
  try {
    // Attempt to query from MySQL first
    try {
      const rows = await db.query('SELECT id, name, email, subject, message, created_at FROM contacts ORDER BY created_at DESC LIMIT 50');
      return res.json({
        success: true,
        source: 'MySQL',
        count: rows.length,
        submissions: rows
      });
    } catch {
      // Fall back to file
      if (fs.existsSync(MESSAGES_FILE)) {
        const fileData = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8'));
        return res.json({
          success: true,
          source: 'File Storage',
          count: fileData.length,
          submissions: fileData
        });
      }
      return res.json({
        success: true,
        source: 'Empty',
        count: 0,
        submissions: []
      });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  submitContact,
  getSubmissions
};
