function userAuth(req, res, next) {
    if (req.session.type != null) {
        return next();
    } else {
        res.status(403).json({error:"Forbidden"});
    }
}

module.exports = userAuth;
