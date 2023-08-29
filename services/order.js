const Order = require('../models/order');
const User = require('../models/user');


const orderService = {

    // add a new order
    addNewOrder: async (idUserOrdered, cost, productList)=> {
        const order = new Order({
            idUserOrdered,
            cost,
            productList,
        });
        return await order.save()
    },

    // get all orders
    getAllOrders: async () => {
        return await Order.find();
    },

    // get an order by its id
    getOrderByIDSearch: async (id) => {
        try{
            const order=await Order.findById(id);
            return order;
        }
        catch (error) {
            console.error('Error fetching order by ID:', error);
            throw error;
          }
    },

    // get an order by users email
    getOrderByUser: async (email) => {
        try{
            const order=await Order.findById(email);
            return order;
        }
        catch (error) {
            console.error('Error fetching order by email:', error);
            throw error;
          }
    },

    // find all orders a user made (used for user personal info page)
    findOrdersForCurrentUser: async(currentUserEmail) => {
        //check if the user with the provided currentUserId exists
        const userExists = await User.exists({email: currentUserEmail });
        if (userExists) {
            //if the user exists, find and return their orders until the current date
            const orders = await Order.find({
              idUserOrdered: currentUserEmail
            });

            if (orders.length > 0) {
                return orders;
            } else {
                //the case where the user has no orders
                return [];
            }
        } else {
            //if the user does not exist
            throw new Error("User with ID " + currentUserEmail + " does not exist.");
        }
    },

    // Edit an order by ID
    editOrder: async (orderId, updatedOrderData) => {
        try {
            // Find the order by its ID and update its fields
            const updatedOrder = await Order.findByIdAndUpdate(orderId, updatedOrderData, { new: true });

            return updatedOrder;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },  

    // Delete an order by ID
    deleteOrder: async (_id) => {
        return await Order.findOneAndDelete({ _id });
    },
};

module.exports = orderService;