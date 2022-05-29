const authController = require('../controller/authController');
const middleController = require('../controller/middleController');

const router=require('express').Router();

router.post('/register',authController.resigterUser);
router.post('/login',authController.loginUser);
router.post('/refresh',authController.requestRefreshToken);
router.post('/logout',middleController.verifyToken,authController.logOut)

module.exports=router