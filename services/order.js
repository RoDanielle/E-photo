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


    findOrdersForCurrentUser: async(currentUserEmail) => {
        console.log("services:", currentUserEmail);

        //check if the user with the provided currentUserId exists
        const userExists = await User.exists({email: currentUserEmail });

        if (userExists) {
            console.log ("services if");
            //if the user exists, find and return their orders until the current date
            const orders = await Order.find({
              idUserOrdered: currentUserEmail
            });

            console.log ("services save");

            if (orders.length > 0) {
                console.log("orders services:", orders);
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
    updateOrder: async (orderId, updatedOrderData) => {
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