const orderService = require('../services/order');
const StoreOrder = require('../models/order');

const orderControllers  = {

    // Controller to create a new order
    createOrder: async (req,res) => {
        try {
            const {idUserOrdered, cost, productList } = req.body;
            const order = await orderService.addNewOrder(idUserOrdered, cost, productList);
            res.status(201).json(order);
        } catch (error) {
            res.status(500).json({error: 'An error occurred while creating the order.'});
        }
    },

    // Controller to get all orders
    getAllOrders: async (req,res) => {
        try {
            const orders = await orderService.getAllOrders();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while retrieving orders.' });
        }
    },

    // Controller to get an order by its ID
    getOrderByID: async (_id) => {
        try{
            return await orderService.getOrderByIDSearch(_id);
        } catch (e) {
            console.log(e);
            throw e;
          }
        },
   

    // Controller to get orders for the currently logged-in user
    getOrdersForCurrentUser: async (req,res) => {
        try {
            // Assuming you have access to the currently logged-in user's ID
            const currentUserId = req.user._id;
            const currentDate = new Date();
            const orders = await orderService.findOrdersForCurrentUser(currentUserId, currentDate);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while retrieving the orders for the current user.' });
        }
    },

    // Edit an order by ID
    editOrder: async (req, res) => {
        try {
            const orderId = req.params.id;
            const updatedData = req.body;

            // Call the editOrder function from the orderService
            const updatedOrder = await orderService.editOrder(orderId, updatedData);

            res.status(200).json(updatedOrder);
        } catch (error) {
            res.status(500).json({ error: `Error editing order: ${error.message}` });
        }
    },

    // Delete an order by ID
    deleteOrder: async (req, res) => {
        try {
            const orderId = req.params.id;

            // Call the deleteOrder function from the orderService
            const result = await orderService.deleteOrder(orderId);

            res.status(200).json({ message: result });
        } catch (error) {
            res.status(500).json({ error: `Error deleting order: ${error.message}` });
        }
    },
    
    addOrdersFromData: async (orders) => {
        try {
          const insertPromises = orders.map(async (order) => {
            const { idUserOrdered, date, cost, productList } = order;
            const newOrder = new StoreOrder({
                idUserOrdered,
                date, 
                cost, 
                productList
            });
            await newOrder.save();
          });
    
          await Promise.all(insertPromises);
    
          return { message: 'Products added from data successfully' };
        } catch (e) {
          console.error(e);
          throw e;
        }
      }
};

module.exports = orderControllers;