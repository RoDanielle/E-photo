// routes/R_location.js
const express = require('express');
const router = express.Router();
const C_location = require('../controllers/location');

router.get("/api/store-location", (req, res) => {
  C_location.getAll()
    .then((data) => {
      console.log(data)
      res.json(data);
    })
    .catch((error) => {
      console.error('Error fetching store location data:', error);
      res.status(500).json({ error: 'Failed to fetch store locations' });
    });
});

//router.put("/api/store-location", adminAuth, (req, res) => {
router.put("/api/store-location", (req, res) => {
    C_location.updateLocation(req.body).then((data) => {
        res.json(data);
    })
});

//router.delete("/api/store-location", adminAuth, (req, res) => {
router.delete("/api/store-location", (req, res) => {
    C_location.deleteLocation(req.body._id).then((data) => {
        res.json(data);
    })
});

//router.post("/api/store-location", adminAuth, (req, res) => {
router.post("/api/store-location", (req, res) => {
    C_location.addLocation(req.body.name, req.body.lat, req.body.lng).then((data) => {
        res.json(data);
    })
});

module.exports = router;
 


// admin - user 
/*
const express = require('express');
const router = express.Router();
//const adminAuth = require("../middleware/adminAuth"); // involve this with users and admin
const C_location  = require('../controllers/C_location');


router.get("/api/store-location", (req, res) => {
    C_location.getAll().then((data) => {
        res.json(data);
    })
});

//router.put("/api/store-location", adminAuth, (req, res) => {
router.put("/api/store-location", (req, res) => {
    C_location.updateLocation(req.body).then((data) => {
        res.json(data);
    })
});

//router.delete("/api/store-location", adminAuth, (req, res) => {
router.delete("/api/store-location", (req, res) => {
    C_location.deleteLocation(req.body._id).then((data) => {
        res.json(data);
    })
});

//router.post("/api/store-location", adminAuth, (req, res) => {
router.post("/api/store-location", (req, res) => {
    C_location.addLocation(req.body.name, req.body.lat, req.body.lng).then((data) => {
        res.json(data);
    })
});

module.exports = router;
*/