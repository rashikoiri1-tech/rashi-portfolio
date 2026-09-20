/**
 * Input Sanitization & Validation Middleware
 */

function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return typeof email === 'string' && re.test(email.trim());
}

function sanitizeString(str, maxLength = 1000) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .trim()
    .slice(0, maxLength);
}

function validateContactInput(req, res, next) {
  const { name, email, subject, message } = req.body;

  const cleanName = sanitizeString(name, 100);
  const cleanEmail = sanitizeString(email, 150);
  const cleanSubject = sanitizeString(subject || 'Portfolio Inquiry', 150);
  const cleanMessage = sanitizeString(message, 3000);

  if (!cleanName || cleanName.length < 2) {
    return res.status(400).json({
      success: false,
      error: 'VALIDATION_ERROR',
      message: 'Please provide your full name (at least 2 characters).'
    });
  }

  if (!validateEmail(cleanEmail)) {
    return res.status(400).json({
      success: false,
      error: 'VALIDATION_ERROR',
      message: 'Please provide a valid, active email address.'
    });
  }

  if (!cleanMessage || cleanMessage.length < 10) {
    return res.status(400).json({
      success: false,
      error: 'VALIDATION_ERROR',
      message: 'Message must contain at least 10 characters describing your inquiry.'
    });
  }

  // Attach sanitized fields to req.sanitized
  req.sanitized = {
    name: cleanName,
    email: cleanEmail,
    subject: cleanSubject,
    message: cleanMessage
  };

  next();
}

module.exports = {
  validateEmail,
  sanitizeString,
  validateContactInput
};
