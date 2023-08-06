const Product = require('../models/product')

const S_Product = {

    addProduct: async (name,image,brand,category,price,countInStock,rating,numReviews,description)=> {

        const product = new Product({
            name,
            image,
            brand,
            category,
            price,
            countInStock,
            rating,
            numReviews,
            description,
        });
        return await branch.save()
    },

    getProductByNameSearch: async (name) => {
        return await Product.find({ name: {$regex: '^.*' + name + '.*$', $options: 'i'} });
    },

    getProductById: async (productId) => {
        try {
          // Query the database to retrieve the product by its ID
          const product = await Product.findById(productId);
    
          return product; // Return the retrieved product or null if not found
        } catch (error) {
          console.error('Error fetching product by ID:', error);
          throw error;
        }
      },    

    updateProduct: async (location)=> {
        return await Product.findOneAndUpdate({ _id: product._id }, product);
    },

    deleteProduct: async (_id)=> {
        return await Product.findOneAndDelete({ _id });
    },
    
    getAll: async ()=> {
        return await Product.find({})
    },


    
}

module.exports = S_Product;