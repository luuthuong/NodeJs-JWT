const User=require('../model/user')
const userController={
    getUserAll:async(req,res)=>{
        try{
            const users=await User.find()
            return res.status(200).json({
                msg:'sucess',
                data:users
            })
        }catch(err){
            res.status(500).json(err)
        }
    },
    deleteUser:async(req,res)=>{
        try{
            const result =await User.findByIdAndDelete(req.params.id)
            result?
                res.status(200).json({
                    msg:'User was deleted'
                }):
                res.status(404).json({
                msg:'User not found !'
            })
        }
        catch(err){
            res.status(500).json({
                msg:'error',
                data:err
            })
        }
    }
}
module.exports=userController