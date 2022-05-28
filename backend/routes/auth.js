const authController = require('../controller/authController');

const router=require('express').Router();

router.post('/register',authController.resigterUser)
router.post('/login',authController.loginUser)

module.exports=router