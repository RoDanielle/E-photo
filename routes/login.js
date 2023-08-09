const express = require('express');
const {
    registerView,
    loginView,
    registerUser,
    loginUser,
}=require('../controllers/login');
//const {dashboardView}=require('../controllers/dashboard');
const {protectRoute}=require('../auth/protect');
const router = express.Router();
router.get('/register', registerView);
router.get('/login', loginView);
//dashboard
//router.get('/dashboard', protectRoute, dashboardView);
router.post('/register', registerUser);
router.post('/login', loginUser);
module.exports = router;