const express = require('express');
const router = express.Router();

// Middleware to check if user is logged in
router.get('/checkLoggedIn', (req, res) => {
  if (req.session.isLoggedIn) {
    const isAdmin = req.session.type === 'admin';
    res.json({ isLoggedIn: true, isAdmin: isAdmin });
  } else {
    res.json({ isLoggedIn: false, isAdmin: false });
  }
});

// Middleware to get the logged user email (this is our key for a user)
router.get('/getLoggedInID', (req, res) => {
  if (req.session.isLoggedIn)
  {
    const userEmail = req.session.userEmail;
    res.json({userEmail});
  }
  else{
    res.json({userEmail : null});
  }
});

module.exports = router;