const express = require('express');
const { signup , login, getProfile} = require('../controllers/authController');
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();
//POST
//public routes
router.post('/signup',signup);
router.post('/login',login);
//protected routes
router.get('/profile',authMiddleware,getProfile);
module.exports = router;