const Product = require('../models/product')

const S_Product = {

    addProduct: async (name, image, brand, category, price, countInStock, rating, numReviews, description, color,popularity)=> {

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
            color,
            popularity
        });
        return await product.save()
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
      
    updateProduct: async (productId, updatedProductData) => {
        try {
            // Find the product by its ID and update its fields
            const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, { new: true });

            return updatedProduct;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },  
    /*
    updateProduct: async (product)=> {
        return await Product.findOneAndUpdate({ _id: product._id }, product);
    },
    */

    deleteProduct: async (_id)=> {
        return await Product.findOneAndDelete({ _id });
    },
    
    getAll: async ()=> {
        return await Product.find({})
    },

    /* -------------- see if needed (noya)---------------

        checkIfProductExists: async (name) => {
        const product = await Product.findOne({ name });
        return product !== null;
    },
    getProductByName: async (productName) => {
        try {
          // Query the database to retrieve the product by its ID
          const product = await Product.findById(productName);
    
          return product; // Return the retrieved product or null if not found
        } catch (error) {
          console.error('Error fetching product by name:', error);
          throw error;
        }
      },
    */
     
      calculateAveragePricesByCategory: async () => {
        try {
          const aggregateData = await Product.aggregate([
            {
              $group: {
                _id: '$category',
                averagePrice: { $avg: '$price' }
              }
            }
          ]);
    
          return aggregateData;
        } catch (error) {
          console.error('Error calculating average prices:', error);
          throw error;
        }
      }




}

module.exports = S_Product;