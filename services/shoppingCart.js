const ShoppingBasket = require('../models/shoppingCart');

const CartService = {

    addProductToBasket: async (productIds) => {
        const basket = new ShoppingBasket({
            products: productIds
        });
        return await basket.save();
    },

    updateCart: async (productId, quantity) => {
        try {
            // Implement your update quantity logic here
            const cart = await ShoppingBasket.findOne();
            // Update the quantity of the specified product in the cart
            const updatedProducts = cart.products.map(product => {
                if (product._id.toString() === productId) {
                    product.quantity = quantity; // Update the quantity property
                }
                return product;
            });
            cart.products = updatedProducts;
            await cart.save();
            return cart.products;
        } catch (error) {
            throw error;
        }
    },

    deleteCart: async (_id) => {
        return await ShoppingBasket.findOneAndDelete({ _id });
    },

    deleteCarts: async () => {
        return await ShoppingBasket.deleteMany({});
    },

    addProductsToCartFromData: async (productIdsArray) => {
        try {
            const insertPromises = productIdsArray.map(async (productIds) => {
                const newBasket = new ShoppingBasket({
                    products: productIds,
                });
                await newBasket.save();
            });

            await Promise.all(insertPromises);

            return { message: 'Products added to carts from data successfully' };
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    addProductsToCart: async (productIds) => {
        try {
            const newBasket = new ShoppingBasket({
                products: productIds,
            });
            await newBasket.save();

            return { message: 'Products added to cart successfully', cart: newBasket };
        } catch (e) {
            console.error(e);
            throw e;
        }
    },

    deleteProduct: async (productId) => {
        try {
            const cart = await ShoppingBasket.findOne();
            cart.products = cart.products.filter(product => product._id.toString() !== productId);
            await cart.save();
            return cart.products;
        } catch (error) {
            throw error;
        }
    },
};

module.exports = CartService;
