const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
   name: {
      type: String,
      required: "Name is required",
    },
    email: {
      type: String,
      require: "Email is required",
      unique: true,
    },
    password: {
      type: String,
      required: "Password is required",
    },
    description: {
      type: String,
      default: "Passionate traveler and explorer, capturing moments from around the world through my lens",
    },
    
    location: {     
      type: String,    
      default: "Tel Aviv",
      },
      
     date: {
       type: Date,
       default: Date.now,
     },
     
    isManager: {
      type: Boolean,
      required: true,
      default: false,
    },
    /*
    numOfPurchases:
    {
      type: Number,
      required: true,
      default: 0,
    }
    */

    userShoppingBasket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ShoppingBasket',
    },

  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;