const ShoppingBasket = require("../models/shoppingCart")
const CartService = require('../services/shoppingCart');


const C_shoppingCart = {

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

    addToCart: async (req, res) => {
      try {
        console.log('Request body:', req.body);
        const { productId } = req.body;
  
        // מצא את היוזר המחובר
        const loggedInUser = await User.findById(req.user._id);
  
        if (!loggedInUser) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        // מצא את העגלה של היוזר
        let userCart = await ShoppingBasket.findOne({ owner: loggedInUser._id });
  
        if (!userCart) {
          // אם אין עגלה, יצור עגלה חדשה ושיוך ליוזר
          userCart = new ShoppingBasket({ owner: loggedInUser._id, products: [productId] });
          await userCart.save();
  
          // שיוך העגלה ליוזר
          loggedInUser.userShoppingBasket = userCart._id;
          await loggedInUser.save();
        } else {
          // אחרת, הוסף את המוצר לרשימת המוצרים בעגלה
          userCart.products.push(productId);
          await userCart.save();
        }
  
        // שלח תשובה בהצלחה
        res.json({ message: 'Product added to cart successfully' });
      } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'An error occurred while adding the product to the cart' });
      }
    },




  }


module.exports = C_shoppingCart;