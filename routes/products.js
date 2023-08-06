const express = require('express');
const router = express.Router();
const C_products  = require('../controllers/products'); 
const Products = require('../data/products'); // Import the products data
const adminAuthMiddleware = require('../middleware/adminAuth'); // Import your admin authentication middleware

// get all peoducts 
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

 // Get details for a single product by ID
router.get("/api/store-products/:productId", (req, res) => {
  const productId = req.params.productId;
  
  C_products.getProductById(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    })
    .catch((error) => {
      console.error('Error fetching product details:', error);
      res.status(500).json({ error: 'Failed to fetch product details' });
    });
}); 

//router.put("/api/store-products", adminAuthMiddleware, (req, res) => {
router.put("/api/store-products", (req, res) => {
    C_products.update(req.body).then((data) => {
        res.json(data);
    })
});

//router.delete("/api/store-products", adminAuthMiddleware, (req, res) => {
    router.delete("/api/store-products", (req, res) => {
        C_products.deleteproduct(req.body._id).then((data) => {
            res.json(data);
        })
    });

// Add a single product manually
router.post('/api/store-products', adminAuthMiddleware, async (req, res) => {
    const { name, image, brand, category, price, countInStock, rating, numReviews, description } = req.body;
  
    try {
      const newProduct = await C_products.addProduct(name, image, brand, category, price, countInStock, rating, numReviews, description);
      res.json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ error: 'Failed to add product' });
    }
  });
  
  // Add products from data file
  router.post('/api/store-products/bulk', adminAuthMiddleware, async (req, res) => {
    try {
      const result = await C_products.addProductsFromData(Products); // Use your products data file
      res.json(result);
    } catch (error) {
      console.error('Error adding products from data:', error);
      res.status(500).json({ error: 'Failed to add products from data' });
    }
  });

module.exports = router;