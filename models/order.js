
/*
The code defines a Mongoose schema and model for storing information about orders in our online shop. 
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema(
    {
        idUserOrdered: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now,
            required: true
        },
        cost: {
            type: Number,
            required: true
        },
        productList: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product'
                },
                productName: {
                    type: String,
                    required: true
                },
                productPrice: {
                    type: Number,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
    }
);


const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
