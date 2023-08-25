const Order = require('../models/order');
const User = require('../models/user');


const orderService = {
    

    addOrder: async (cost, productList)=> {
        const order = new Order({
            cost,
            productList,
        });
        return await order.save()
    },

    getOrderByIDSearch: async (id) => {
        return await Order.find(id);
    },

    //const currentUserId = req.user._id;
    //const currentDate = new Date();

    findOrdersForCurrentUser: async(currentUserId, currentDate) => {

        //check if the user with the provided currentUserId exists
        const userExists = await User.exists({ _id: currentUserId });

        if (userExists) {
            //if the user exists, find and return their orders until the current date
            const orders = await Order.find({
              idUserOrdered: currentUserId,
              date: { $lte: currentDate }, //$lte operator to find orders until the current date
            }).save;

            if (orders.length > 0) {
                return orders;
            } else {
                //the case where the user has no orders
                return [];
            }
        } else {
            //if the user does not exist
            throw new Error("User with ID " + currentUserId + " does not exist.");
        }
    }
};


module.exports = orderService;