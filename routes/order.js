const express = require('express');
const router = express.Router();
const orderControllers  = require('../controllers/order');


// Create a new order
router.post('/api/create', orderControllers.createOrder);


// Get all orders
//router.get('/all', orderControllers.getAllOrders);


// Get an order by ID
//router.get('/:id', orderControllers.getOrderById);


// Get orders for the currently logged-in user
//router.get('/user', orderControllers.getOrdersForCurrentUser);


module.exports = router;