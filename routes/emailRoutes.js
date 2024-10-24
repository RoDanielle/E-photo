const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

// Existing route
router.post('/send-email', emailController.sendContactFormEmail);

// New route for password reset
router.post('/send-password-reset', emailController.sendPasswordResetEmailController);

router.post('/send-password-reset-email', emailController.sendPasswordResetEmailController);

module.exports = router;