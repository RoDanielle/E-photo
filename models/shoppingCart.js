const mongoose = require("mongoose");

const ShoppingBasketSchema = new mongoose.Schema(
  {
  
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ShoppingBasket = mongoose.model("ShoppingCart", ShoppingBasketSchema);

module.exports = ShoppingBasket;