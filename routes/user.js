// routes/R_user.js
const  express = require('express');
const  router = express.Router();
const  C_user  = require('../controllers/user'); 
const { route } = require('./products');
const adminAuthMiddleware = require('../middleware/adminAuth'); // Import your admin authentication middleware
const userAuth = require('../middleware/userAuth'); // Update the path


router.get("/api/store-user", (req, res) => {
    C_user.getAll()
      .then((data) => {
        console.log(data)
        res.json(data);
      })
      .catch((error) => {
        console.error('Error fetching store user data:', error);
        res.status(500).json({ error: 'Failed to fetch store user' });
      });
  });


 
  //router.put("/api/store-products", adminAuth, (req, res) => {
router.put("/api/store-user", (req, res) => {
    C_user.update(req.body).then((data) => {
        res.json(data);
    })
});

//router.delete("/api/store-products", adminAuth, (req, res) => {
router.delete("/api/store-user", (req, res) => {
        C_user.deleteUser(req.body._id).then((data) => {
            res.json(data);
        })
    });




router.post('/register', C_user.register);
router.post('/login',  C_user.login);
//router.post('/logout', authMiddleware, C_user.logout);
router.post('/logout', C_user.logout);

/*
router.get('/admin/dashboard', requireLogin, adminAuth, (req, res) => {
  // If the user passes both requireLogin and adminAuth checks,
  // they are both logged in and an admin.
  
  // You can render your admin dashboard here or send data related to admin functionality.
  res.render('admin_dashboard');
});
*/

 

router.get("/api/current-user", (req, res) => {
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


module.exports = router;