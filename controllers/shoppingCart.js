const CartService = require('../services/shoppingCart');

const C_cart = {
  getCartContents: async (req, res) => {
    try {
      const cartContents = await CartService.getCartContents();
      res.json(cartContents);
    } catch (error) {
      console.error('Error fetching cart contents:', error);
      res.status(500).json({ error: 'Failed to fetch cart contents' });
    }
  },

  addToCart: async (req, res) => {
    const { productId, quantity } = req.body;

    try {
      const updatedCart = await CartService.addToCart(productId, quantity);
      res.json(updatedCart);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      res.status(500).json({ error: 'Failed to add product to cart' });
    }
  },

  updateCartItemQuantity: async (req, res) => {
    const { productId, quantity } = req.body;

    try {
      const updatedCart = await CartService.updateCartItemQuantity(productId, quantity);
      res.json(updatedCart);
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      res.status(500).json({ error: 'Failed to update cart item quantity' });
    }
  },

  removeFromCart: async (req, res) => {
    const { productId } = req.body;

    try {
      const updatedCart = await CartService.removeFromCart(productId);
      res.json(updatedCart);
    } catch (error) {
      console.error('Error removing product from cart:', error);
      res.status(500).json({ error: 'Failed to remove product from cart' });
    }
  },
};

module.exports = C_cart;
