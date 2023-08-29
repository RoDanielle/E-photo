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
            return await orderService.getAllOrders();
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
    getOrdersForCurrentUser: async (currentUserEmail) => {
        try {
                const orders = await orderService.findOrdersForCurrentUser(currentUserEmail);
                return orders;
            } catch (error) {
                res.status(500).json({ error: 'An error occurred while retrieving the orders for the current user.' });
            }
        },

    // Edit an order by ID
    editOrder: async (orderId, updatedOrderData) => {
        try {
            const updatedOrder = await orderService.editOrder(orderId, updatedOrderData);
            return updatedOrder;
        } catch (e) {
            console.log(e);
            throw e;
        }
    },

    // Delete an order by ID
    deleteOrder: async (_id) => {
        return await orderService.deleteOrder(_id);
    },
    
    // Add orders from data file 
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