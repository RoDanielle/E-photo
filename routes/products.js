// routes/R_products.js
const  express = require('express');
const  router = express.Router();
const  C_products  = require('../controllers/products'); 

router.get("/api/store-products", (req, res) => {
    C_products.getAll()
      .then((data) => {
        console.log(data)
        res.json(data);
      })
      .catch((error) => {
        console.error('Error fetching store products data:', error);
        res.status(500).json({ error: 'Failed to fetch store products' });
      });
  });


  //router.put("/api/store-products", adminAuth, (req, res) => {
router.put("/api/store-products", (req, res) => {
    C_products.update(req.body).then((data) => {
        res.json(data);
    })
});

//router.delete("/api/store-products", adminAuth, (req, res) => {
    router.delete("/api/store-products", (req, res) => {
        C_products.deleteproduct(req.body._id).then((data) => {
            res.json(data);
        })
    });


    //router.post("/api/store-products", adminAuth, (req, res) => {
router.post("/api/store-products", (req, res) => {
    C_products.addproduct(req.body.name, req.body.image, req.body.brand, req.body.category, req.body.price, req.body.countInStock, req.body.rating,
        req.body.numReviews,req.body.description).then((data) => {
        res.json(data);
    })
});

module.exports = router;