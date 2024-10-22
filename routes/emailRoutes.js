const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

// Route to send email via controller
router.post('/send-email', emailController.sendContactFormEmail);

module.exports = router;
