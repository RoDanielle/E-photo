/*
These middleware functions are exported so they can be used in different parts of the application to control access to specific routes based on the user's authentication status.
They help manage user access permissions and enhance the security of the application by ensuring that only authorized users can access certain routes.
For example, to order a product you need to register, to view the products you do not need to register

*/

/*
const protectRoute = (req, res, next) =>{
  if (req.isAuthenticated()) {
    return next();
  }
  console.log('Please log in to continue');
  res.redirect('../views/login');
}

const allowIf = (req, res, next) =>{
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('../views/products');      
}
module.exports = {
    protectRoute,
    allowIf,
  };
  */