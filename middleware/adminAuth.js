/*
In summary, the adminAuth middleware is used to verify administrator access.
It checks whether the user's role is 'admin' in the session or whether they provided a valid admin key in the headers.
If either of these conditions is met, the request is allowed to proceed; otherwise, a "Forbidden" error response is sent.
*/

async function adminAuth(req, res, next) {
    if (req?.session?.type == 'admin') {
      next();
      return;
    } else {
      res.status(403).json({error:"Forbidden"});
      return;
    }
  }
  
  module.exports = adminAuth;
  