/*
The code defines a middleware function called requireLogin, 
which is used to verify if a user is logged in and has a valid session before granting access to certain routes or resources.
*/


// Middleware to check if user is logged in
async function requireLogin(req, res, next) {
    console.log('Checking session state:', req.session);

    if (req.session.isLoggedIn) {
        console.log('User is logged in.');
        next(); // User is logged in, proceed to the next middleware
    } else {
        console.log('User is not logged in. Returning 401 Unauthorized.');
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = requireLogin;
