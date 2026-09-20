const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { validateContactInput } = require('../middleware/validation');
const rateLimiter = require('../middleware/rateLimiter');

router.post('/', rateLimiter, validateContactInput, contactController.submitContact);
router.get('/submissions', contactController.getSubmissions);

module.exports = router;
