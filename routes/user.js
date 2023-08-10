// routes/R_user.js
const  express = require('express');
const  router = express.Router();
const  C_user  = require('../controllers/user'); 
const { route } = require('./products');
const adminAuthMiddleware = require('../middleware/adminAuth'); // Import your admin authentication middleware
const authMiddleware = require('../middleware/costumer'); // Update the path


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
//router.post('/login', authMiddleware, C_user.findUserByEmailAndPassword);
//router.post('/logout', authMiddleware, C_user.logout);
router.post('/logout', C_user.logout);

module.exports = router;