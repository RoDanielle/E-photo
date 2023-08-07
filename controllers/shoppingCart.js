const CartSchema = require("../models/shoppingCart")
const CartService = require('../services/shoppingCart');


const C_location = {

    // returns all Carts 
    getAll: async ()=> {
        return await CartService.getAll();
    },

    updateCart: async ()=> {
        return await CartService.updateCart(Cart);
    },
/*
    getCartByUserName: async (name)=> {
        if(name)
            return await CartService.getCartByUserName(name);
        return await CartService.getAll();
    },
*/
    deleteCart: async (_id)=> {
        return await CartService.deleteCart(_id);
    },

    deleteCarts: async ()=> {
      return await CartService.deleteCarts();
  },

    deleteProduct: async (_id)=> {
      return await CartService.deleteProduct(_id);
    },

    // manually 
    addProductsToCart: async (productIds) => {
      try {
        const newBasket = new CartSchema({
          products: productIds,
        });
        await newBasket.save();
        
        return { message: 'Products added to cart successfully', cart: newBasket };
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  
    addProductsToCartFromData: async (productIdsArray) => {
      try {
        const insertPromises = productIdsArray.map(async (productIds) => {
          const newBasket = new CartSchema({
            products: productIds,
          });
          await newBasket.save();
        });
  
        await Promise.all(insertPromises);
  
        return { message: 'Products added to carts from data successfully' };
      } catch (e) {
        console.error(e);
        throw e;
      }
    },

    };


module.exports = C_location;
