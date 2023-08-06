const ShoppingBasket = require('../models/shoppingCart');

const CartService = {
  getCartContents: async () => {
    try {
      const cart = await ShoppingBasket.findOne().populate('products');
      return cart.products;
    } catch (error) {
      throw error;
    }
  },

  addToCart: async (productId, quantity) => {
    try {
      const cart = await ShoppingBasket.findOne();
      cart.products.push(productId);
      await cart.save();
      return cart.products;
    } catch (error) {
      throw error;
    }
  },

  updateCartItemQuantity: async (productId, quantity) => {
    try {
      // You might need to implement additional logic here if you want to update the quantity
      const cart = await ShoppingBasket.findOne();
      return cart.products;
    } catch (error) {
      throw error;
    }
  },

  removeFromCart: async (productId) => {
    try {
      const cart = await ShoppingBasket.findOne();
      cart.products = cart.products.filter((id) => id.toString() !== productId);
      await cart.save();
      return cart.products;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = CartService;
