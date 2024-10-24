// routes/R_user.js
const  express = require('express');
const  router = express.Router();
const  C_user  = require('../controllers/user'); 
const { route } = require('./products');
const adminAuthMiddleware = require('../middleware/adminAuth'); 
const userAuthMiddleware = require('../middleware/costumer'); 

// get all users
router.get("/api/store-user", adminAuthMiddleware, (req, res) => {
    C_user.getAll()
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.error('Error fetching store user data:', error);
        res.status(500).json({ error: 'Failed to fetch store user' });
      });
  });

// only admin - update a user
router.put("/api/store-user/:userId", adminAuthMiddleware, async (req, res) => {
  const userId = req.params.userId;
  const updatedUserData = req.body;
  try {
      const updatedUser = await C_user.updateUser(userId, updatedUserData);
      res.json({ message: 'User updated successfully', user: updatedUser});
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user' });
  }
});

// only admin - delete
router.delete("/api/store-user/:userId", adminAuthMiddleware, async (req, res) => {
  const userId = req.params.userId;
  try {
    const deletedUser = await C_user.deleteUser(userId);
    if (deletedUser) {
      res.json({ success: true, message: 'User deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting user' });
  }
});

// add a new user (registration)
router.post('/register', C_user.register);

// login
router.post('/login',  C_user.login);

//logout
router.post('/logout', C_user.logout);

// get the logged in user
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

// get a user that matches a provided id
router.get("/api/user-by-id/:id",userAuthMiddleware, (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ error: 'ID is required' });
  }
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
},);

// get a user that matches a provided email
router.get("/api/user-by-email/:email",userAuthMiddleware, (req, res) => {
  const email = req.params.email;
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

// Check if email exists
router.post('/check-email', C_user.checkIfEmailExists);

// Initiate password reset
router.post('/initiate-password-reset', C_user.initiatePasswordReset);
// Reset password
router.post('/reset-password', C_user.resetPassword);


module.exports = router;