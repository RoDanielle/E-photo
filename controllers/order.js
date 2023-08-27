const orderService = require('../services/order');

const orderControllers  = {

    // Controller to create a new order
    createOrder: async (req,res) => {
        try {
            const {idUserOrdered, cost, productList } = req.body;
            const order = await orderService.addNewOrder(idUserOrdered, date, cost, productList);
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
    getOrderByID: async (req,res) => {
        try{
            const orderID = req.params.id;
            const order = await orderService.getOrderByIDSearch(orderID);
            if (!order) {
                return res.status(404).json({message: 'Order not found' });
            }
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while retrieving the order.' });
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
};


module.exports = orderControllers;





/*
    addNewOrder: async (req,res) => {
        const newOrder = await orderService.addNewOrder(req);
        res.json(newOrder);
    },

    getOrderByIDSearch: async (req,res) => {
        const IDOrder = await orderService.getOrderByIDSearch(req);
        if (!IDOrder){
            return res.status(404).json(console.error('Order was not found'));
        }
        res.json(IDOrder);
    },

    findOrdersForCurrentUser: async(req,res) => {
        const currentUserId = req.user._id;
        const currentDate = new Date();

        if (!currentUserId){
            return res.status(404).json(console.error('User was not found'));
        }
        const orders[] = 

        

    }




}
*/

