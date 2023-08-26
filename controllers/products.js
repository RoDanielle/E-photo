const S_products = require('../services/products');
const StoreProduct = require('../models/product');

const C_products = {
  getAll: async () => {
    return await S_products.getAll();
  },

  getProductById: async (_id) => {
    try {
      return await S_products.getProductById(_id);
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  updateProduct: async (productId, updatedProductData) => {
    try {
        const updatedProduct = await S_products.updateProduct(productId, updatedProductData);
        return updatedProduct;
    } catch (e) {
        console.log(e);
        throw e;
    }
  },

  /*
  updateProduct: async (product) => {
    return await S_products.updateProduct(product);
  },
  */

  getProductByNameSearch: async (name) => {
    if (name)
      return await S_products.getProductByNameSearch(name);
    return await S_products.getAll();
  },

  deleteProduct: async (_id) => {
    return await S_products.deleteProduct(_id);
  },

  addProduct: async (name, image, brand, category, price, countInStock, rating, numReviews, description,color,popularity) => {
    try {
      return await S_products.addProduct(name, image, brand, category, price, countInStock, rating, numReviews, description,color,popularity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

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

  checkIfProductExists: async (name) => {
    const product = await Product.findOne({ name });
    return product !== null;
  },

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


/*
// returns all Products without the id of each product
const getAll = async ()=> {
  return await S_products.getAll();
}

const updateProduct =  async (product)=> {
  return await S_products.updateProduct(product);
}

const getProductByNameSearch = async (name)=> {
  if(name)
      return await S_products.getProductByNameSearch(name);
  return await S_products.getAll();
}
const deleteProduct =  async (_id)=> {
  return await S_products.deleteProduct(_id);
}


 const addProduct = async (name,image,brand,category,price,countInStock,rating,numReviews,description)=> {
  try{
      return await S_products.addProduct(name,image,brand,category,price,countInStock,rating,numReviews,description);
  }
  catch(e){
      console.log(e);
      res.json({error:e});
  }
}

module.exports = {
    getAll,
    updateProduct,
    getProductByNameSearch,
    deleteProduct,
    addProduct,
}

*/