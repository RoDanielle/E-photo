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
    try {
      const cartProducts = await CartService.addToCart(req.product_id); // Use the correct property name
      res.status(200).json(cartProducts);
    } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).json({ error: 'Error adding to cart' });
    }
  },


  updateCartItemQuantity: async (req, res) => {
    const { itemId, quantity } = req.body;

    try {
      const updatedCart = await CartService.updateCartItemQuantity(itemId, quantity);
      res.json(updatedCart);
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      res.status(500).json({ error: 'Failed to update cart item quantity' });
    }
  },

  removeFromCart: async (req, res) => {
    const { itemId } = req.body;

    try {
      const updatedCart = await CartService.removeFromCart(itemId);
      res.json(updatedCart);
    } catch (error) {
      console.error('Error removing product from cart:', error);
      res.status(500).json({ error: 'Failed to remove product from cart' });
    }
  },
};

module.exports = C_cart;
