const S_products = require('../services/products');
const StoreProduct = require('../models/product');

const C_products = {
  getAll: async () => {
    try {
      return await S_products.getAll();
  }
  catch (e) {
      console.log(e);
  }
  },

  getProductById: async (_id) => {
    try {
      return await S_products.getProductById(_id);
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  updateProduct: async (product) => {
    try{
      return await S_products.updateProduct(product);
    }
    catch (e){
      console.log(e);
    }
  },

  getProductByNameSearch: async (name) => {
    try {
    if (name)
      return await S_products.getProductByNameSearch(name);
    return await S_products.getAll();
  } catch (e) {
    console.log(e);
}},

  deleteProduct: async (_id) => {
    try{
      return await S_products.deleteProduct(_id);
    }catch (e) {
      console.log(e);
  }},

  addProduct: async (req, res) =>{
    const  {name, image, brand, category, price, countInStock, rating, numReviews, description,color,popularity} = req.body;
    try {
      const existingProduct=await S_products.checkIfProductExists(name);
      if(existingProduct){
        console.log("name check returned true");
        return res.json({ message: 'Product is already in data base' });
      }
      await S_products.addProduct(name, image, brand, category, price, countInStock, rating, numReviews, description,color,popularity);
      req.session.name=name;
      req.session.type = 'basic';
      res.json({ message: 'add product successfully' });
    } catch (error) {
      console.log('Error add product:', error.message, error);
      console.error('Error add product:', error.message, error);
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