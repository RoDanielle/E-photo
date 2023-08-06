const  express = require('express');
const  router = express.Router();
const  C_ShoppingCart  = require('../controllers/shoppingCart'); 
//const Basket = require('../data/products'); // Import the products data -- > check later if i need this one . 
const adminAuthMiddleware = require('../middleware/adminAuth'); // Import your admin authentication middleware

// Get the contents of the shopping cart
router.get('/api/cart', async (req, res) => {
  try {
    const cartContents = await C_ShoppingCart.getCartContents();
    res.json(cartContents);
  } catch (error) {
    console.error('Error fetching cart contents:', error);
    res.status(500).json({ error: 'Failed to fetch cart contents' });
  }
});

// Add a product to the shopping cart
router.post('/api/cart/add', async (req, res) => {
  try {
    const updatedCart = await C_ShoppingCart.addToCart(req.body.product_id); // Use the correct property name
    res.json(updatedCart);
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'Failed to add product to cart' });
  }
});

// Update the quantity of a product in the shopping cart
router.put('/api/cart/update', async (req, res) => {
  const { itemId, quantity } = req.body;

  try {
    const updatedCart = await C_ShoppingCart.updateCartItemQuantity(itemId, quantity);
    res.json(updatedCart);
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    res.status(500).json({ error: 'Failed to update cart item quantity' });
  }
});

// Remove a product from the shopping cart
router.delete('/api/cart/remove', async (req, res) => {
  const { itemId } = req.body;

  try {
    const updatedCart = await C_ShoppingCart.removeFromCart(itemId);
    res.json(updatedCart);
  } catch (error) {
    console.error('Error removing product from cart:', error);
    res.status(500).json({ error: 'Failed to remove product from cart' });
  }
});

module.exports = router;