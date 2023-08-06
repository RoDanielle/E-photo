// routes/R_user.js
const  express = require('express');
const  router = express.Router();
const  C_user  = require('../controllers/user'); 
const { route } = require('./products');
const adminAuthMiddleware = require('../middleware/adminAuth'); // Import your admin authentication middleware



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

/*
    //router.post("/api/store-products", adminAuth, (req, res) => {
router.post("/api/store-user", (req, res) => {
    C_user.addUser(req.body.name, req.body.email, req.body.password).then((data) => {
        res.json(data);
    })
});
*/

// only admin
router.post('/api/add-user', adminAuthMiddleware, async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Call the addUserToDB function from your user controller
      const newUser= await C_user.addUser(name, email, password);
      res.json({message: 'User added successfully', user:newUser});
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ error: 'Failed to add user' });
    }
  });

// Load user from data when starting the server
router.post('/api/add-user', async (req, res) => {
  try {
    const result = await C_user.addUserFromData(storeUsers);
    res.json(result);
  } catch (error) {
    console.error('Error adding store users from data:', error);
    res.status(500).json({ error: 'Failed to add store users from data' });
  }
});



module.exports = router;