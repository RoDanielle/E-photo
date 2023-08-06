async function adminAuth(req, res, next) {
    if (req?.session?.type == 'admin') {
      next();
      return;
    }
    if (req.headers.admin_key === process.env['ADMIN_KEY']) {
      next();
      return;
    } else {
      res.status(403).json({error:"Forbidden"});
      return;
    }
  }
  
  module.exports = adminAuth;
  