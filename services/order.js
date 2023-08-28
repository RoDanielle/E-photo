const Order = require('../models/order');
const User = require('../models/user');


const orderService = {


    addNewOrder: async (idUserOrdered, cost, productList)=> {
        const order = new Order({
            idUserOrdered,
            cost,
            productList,
        });
        return await order.save()
    },


    getAllOrders: async () => {
        return await Order.find();
    },


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
    },


    // Edit an order by ID
    editOrder: async (orderID, updatedData) => {
        try {
            // Find the order by ID
            const order = await Order.findById(orderId);

            if (!order) {
                throw new Error(`Order with ID ${orderId} not found.`);
            }

            // Update the order data
            Object.assign(order, updatedData);

            // Save the updated order
            return await order.save();
        } catch (error) {
            throw new Error(`Error editing order: ${error.message}`);
        }
    },


    // Delete an order by ID
    deleteOrder: async (orderId) => {
        try {
            // Find the order by ID
            const order = await Order.findById(orderId);

            if (!order) {
                throw new Error(`Order with ID ${orderId} not found.`);
            }

            // Delete the order
            await order.remove();
            return `Order with ID ${orderId} deleted successfully.`;
        } catch (error) {
            throw new Error(`Error deleting order: ${error.message}`);
        }
    },
};


module.exports = orderService;