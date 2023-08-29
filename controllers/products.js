const S_products = require('../services/products');
const StoreProduct = require('../models/product');

const C_products = {
  // get all products
  getAll: async () => {
    return await S_products.getAll();
  },

  // get a product by its id
  getProductById: async (_id) => {
    try {
      return await S_products.getProductById(_id);
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  // update a products info
  updateProduct: async (productId, updatedProductData) => {
    try {
        const updatedProduct = await S_products.updateProduct(productId, updatedProductData);
        return updatedProduct;
    } catch (e) {
        console.log(e);
        throw e;
    }
  },

  // get a product by its name
  getProductByNameSearch: async (name) => {
    if (name)
      return await S_products.getProductByNameSearch(name);
    return await S_products.getAll();
  },

  // delete a product
  deleteProduct: async (_id) => {
    return await S_products.deleteProduct(_id);
  },

  // add a new product
  addProduct: async (name, image, brand, category, price, countInStock, rating, numReviews, description,color,popularity) => {
    try {
      return await S_products.addProduct(name, image, brand, category, price, countInStock, rating, numReviews, description,color,popularity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  // add products from data file
  addProductsFromData: async (products) => {
    try {
      const insertPromises = products.map(async (product) => {
        const { name, image, brand, category, price, countInStock, rating, numReviews, description,color,popularity } = product;
        const newProduct = new StoreProduct({
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
        await newProduct.save();
      });

      await Promise.all(insertPromises);

      return { message: 'Products added from data successfully' };
    } catch (e) {
      console.error(e);
      throw e;
    }
  },

  // check if a product exists by its name
  checkIfProductExists: async (name) => {
    const product = await Product.findOne({ name });
    return product !== null;
  },

  // get the avarage price for the categories
  getAveragePricesByCategory: async (req, res) => {
    try {
      const averagePrices = await S_products.calculateAveragePricesByCategory();
      res.json(averagePrices);
    } catch (error) {
      console.error('Error fetching average prices:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
};

module.exports = C_products;

