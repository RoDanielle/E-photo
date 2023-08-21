/*
The code defines a Mongoose schema and model for a shopping basket (or cart) that stores a collection of products 
selected by a user during their shopping experience.
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shoppingBasketSchema = new Schema(
  {
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
      }
    ],
    /*
    // You can include other fields like the owner's ID, bill total, etc.
     owner: {
       type: Schema.Types.ObjectId,
       ref: 'User', // Reference to the User model
     },
     bill: {
       type: Number,
       default: 0,
     },
     */
  },
  {
    timestamps: true,
  }
);

const ShoppingBasket = mongoose.model("ShoppingCart", shoppingBasketSchema);

module.exports = ShoppingBasket;