const middleController = require('../controller/middleController');
const userController = require('../controller/userController')

const router=require('express').Router()

router.get('/',middleController.verifyToken,userController.getUserAll);
router.delete('/:id',middleController.authenUserDefaultOrAdmin,userController.deleteUser)
module.exports=router