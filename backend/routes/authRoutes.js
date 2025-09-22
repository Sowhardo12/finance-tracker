const express = require('express');
const { signup , login, getProfile,updateProfile} = require('../controllers/authController');
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();
//POST
//public routes
router.post('/signup',signup);
router.post('/login',login);
//protected routes
router.get('/profile',authMiddleware,getProfile);
router.put('/profile',authMiddleware,updateProfile);
module.exports = router;