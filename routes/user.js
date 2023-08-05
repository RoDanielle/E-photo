// routes/R_user.js
const  express = require('express');
const  router = express.Router();
const  C_user  = require('../controllers/user'); 
const { route } = require('./products');

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

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Call the addUserToDB function from your user controller
      await C_user.addUser(username, email, password);
      res.send('Registration successful.');
    } catch (error) {
      console.error(error);
      res.status(500).send('Registration failed.');
  }
  });

module.exports = router;