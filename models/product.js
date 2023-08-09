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
      type: Number,
      required: true,
      min: [0, "Only greater than 0"],
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

   /* store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
    },*/
  },
  {
    timestamps: true,
  }
);

//module.exports = mongoose.model('Product', productSchema);

const ProductsMod = mongoose.model('Product', productSchema);
module.exports = ProductsMod;


