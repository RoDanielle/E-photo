const express = require('express');
const router = express.Router();
const orderControllers  = require('../controllers/order');


// Create a new order
router.post('/api/create', orderControllers.createOrder);


// Get all orders
router.get('/api/orders', async (req, res) => {
    try {
        const orders = await orderControllers.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: `Error getting all orders: ${error.message}` });
    }
});

// Delete an order by ID
router.delete('/api/delete-order/:orderId', async (req, res) => {
  const orderId = req.params.orderId;
  console.log(orderId);
  console.log(".");
  try {
    const deletedOrder = await orderControllers.deleteOrder(orderId);
    console.log(deletedOrder);

    if (deletedOrder) {
      res.json({ success: true, message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting order' });
  }
});

// Get an order by ID
router.get('/api/orders/:id', (req, res) => {
  const orderId = req.params.id;
  console.log(orderId);
  orderControllers.getOrderByID(orderId)
    .then((order) => {
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json(order);
    })
    .catch((error) => {
      console.error('Error fetching order details:', error);
      res.status(500).json({ error: 'Failed to fetch order details' });
    });
}); 
// Get an order by user email
router.get('/api/store-orders/:email', (req, res) => {
  const orderUser = req.params.email;
  console.log(orderUser);
  orderControllers.getOrderByUser(orderUser)
    .then((order) => {
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json(order);
    })
    .catch((error) => {
      console.error('Error fetching order details:', error);
      res.status(500).json({ error: 'Failed to fetch order details' });
    });
}); 



// Get orders for the currently logged-in user
router.get('/api/orderByUser/:currentUserEmail', async (req, res) => {
    try {
        const currentUserEmail = req.params.currentUserEmail;
        const orders = await orderControllers.getOrdersForCurrentUser(currentUserEmail);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: `Error getting orders for the current user: ${error.message}` });
    }
});


router.put("/api/store-orders/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  const updatedOrderData = req.body;
  try {
      const updatedOrder = await orderControllers.updateOrder(orderId, updatedOrderData);
      res.json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ error: 'Failed to update order' });
  }
});




router.get('/api/all-orders', orderControllers.getAllOrders);

module.exports = router;