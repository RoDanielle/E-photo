// routes/R_user.js
const  express = require('express');
const  router = express.Router();
const  C_user  = require('../controllers/user'); 
const { route } = require('./products');
const adminAuthMiddleware = require('../middleware/adminAuth'); 
const userAuthMiddleware = require('../middleware/costumer'); 

router.get("/api/store-user", (req, res) => {
    C_user.getAll()
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.error('Error fetching store user data:', error);
        res.status(500).json({ error: 'Failed to fetch store user' });
      });
  });

router.put("/api/store-user", adminAuthMiddleware, (req, res) => {
    C_user.update(req.body).then((data) => {
        res.json(data);
    })
});

router.delete("/api/store-user", adminAuthMiddleware, (req, res) => {
        C_user.deleteUser(req.body._id).then((data) => {
            res.json(data);
        })
    });


router.post('/register', C_user.register);
router.post('/login',  C_user.login);
router.post('/logout', C_user.logout);


router.get("/api/current-user", userAuthMiddleware, (req, res) => {
  const userId = req.session.userId;  
  C_user.getUserById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'user not found' });
      }
      res.json(user);
    })
    .catch((error) => {
      console.error('Error fetching user details:', error);
      res.status(500).json({ error: 'Failed to fetch user details' });
    });
});

router.get("/api/user-by-email",userAuthMiddleware, (req, res) => {
  const { email } = req.query; // Get the email from the query parameters
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  C_user.findUserByEmail(email)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'user not found' });
      }
      res.json(user);
    })
    .catch((error) => {
      console.error('Error fetching user details:', error);
      res.status(500).json({ error: 'Failed to fetch user details' });
    });
});

module.exports = router;