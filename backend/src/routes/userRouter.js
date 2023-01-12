const express = require('express');
const router = express.Router();
const { loginUser,signupUser } = require('../controller/userController');
//signup 
router.post('/signup',signupUser)

//login 
router.post('/login',loginUser)

module.exports = router;