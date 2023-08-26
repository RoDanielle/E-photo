
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        /*id: {
            type: Number,
            unique: true,
        },
        */
        idUserOrdered: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        cost: {
            type: Number,
        },
        productList: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Product', // Reference to the Product model
            }
        ],
    }
);


const Order = mongoose.model("order", orderSchema);
module.exports = Order;
