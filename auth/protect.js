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