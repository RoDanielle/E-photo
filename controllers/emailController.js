const { sendEmail, sendPasswordResetEmail } = require('../services/emailService');

const sendContactFormEmail = async (req, res) => {
  const { name, email, message } = req.body;

  const emailOptions = {
    to: 'e.photocont@gmail.com',  // Set To address
    subject: `E.PHOTO FORM - New message submitted from ${name}`,
    body: `You received a message from ${name} (${email}):\n\n${message}`,
  };

  try {
    await sendEmail(emailOptions.to, emailOptions.subject, emailOptions.body); // Pass to, subject, and body to sendEmail
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to send email' });
  }
};

// Add this new controller method
const sendPasswordResetEmailController = async (req, res) => {
  const { email, resetToken } = req.body;
  try {
    await emailService.sendPasswordResetEmail(email, resetToken);
    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ error: 'Failed to send password reset email' });
  }
};

// Update the module.exports
module.exports = {
  sendContactFormEmail,
  sendPasswordResetEmailController
};
