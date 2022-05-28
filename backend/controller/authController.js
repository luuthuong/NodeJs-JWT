const User=require('../model/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const saltRound=10;
const authController={
    resigterUser:async(req,res,next)=>{
        try{
            const salt=await bcrypt.genSalt(saltRound)
            const hash=await bcrypt.hash(req.body.password,salt)
            const newUser=await new User({
                username:req.body.username,
                password:hash,
                email:req.body.email
            })
            const user=await newUser.save()
            res.status(200).json({
                msg:'sucess',
                data:user
            })
        }catch(err){
            res.status(500).json({
                msg:'error',
                data:err
            })
        }
    },
    
    loginUser:async(req,res,next)=>{
        try{
            const user=await User.findOne({username:req.body.username})
            if(!user){
                res.status(404).json({
                    msg:'Invalid User',
                })
            }
            const result=await bcrypt.compare(req.body.password,user.password)
            !result&&res.status(404).json({
                    msg:'Password wrong'
                })
            const token= jwt.sign({
                id:user._id,
                admin:user.admin
            },
            process.env.ACCESS_TOKEN_KEY,
            {
            expiresIn:"30s"
            })
            res.status(200).json({
                    msg:'Login sucess',
                    data:result,
                    token:token
            })
        }catch(err)
        {
            res.status(500).json({
                msg:'error',
                data:err
            })
        }
    }
}

module.exports=authController;
