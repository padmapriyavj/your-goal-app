const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');


console.log('Auth routes loaded');

router.post('/register', authController.signupController);
router.post('/login', authController.loginController);

module.exports = router;
