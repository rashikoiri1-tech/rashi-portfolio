const express = require('express');
const router = express.Router();

const contactRoutes = require('./contactRoutes');
const projectRoutes = require('./projectRoutes');
const analyticsRoutes = require('./analyticsRoutes');
const healthRoutes = require('./healthRoutes');

router.use('/contact', contactRoutes);
router.use('/projects', projectRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/health', healthRoutes);

module.exports = router;
