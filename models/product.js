/*
The code defines a Mongoose schema and model for storing information about products within an e-commerce application. 
This schema outlines the structure and attributes of a product document that will be stored in a MongoDB database.
*/

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, " name is required."],
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    countInStock: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    numReviews: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    color:
    {
      type:String,
      required: true,
    },
    popularity:
    {
      type:String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const ProductsMod = mongoose.model('Product', productSchema);
module.exports = ProductsMod;


