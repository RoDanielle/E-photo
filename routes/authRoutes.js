const express = require('express');
const router = express.Router();

// Middleware to check if user is logged in
router.get('/checkLoggedIn', (req, res) => {
  if (req.session.isLoggedIn) {
    res.json({ isLoggedIn: true });
  } else {
    res.json({ isLoggedIn: false });
  }
});

module.exports = router;