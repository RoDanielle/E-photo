const S_products = require('../services/products');
//const products = require("../data/products");


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