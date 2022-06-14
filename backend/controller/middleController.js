const jwt=require('jsonwebtoken')
const middleController={
    verifyToken:(req,res,next)=>{
        const accessToken=req.headers.token;
        if(accessToken){
            jwt.verify(accessToken,process.env.ACCESS_TOKEN_KEY,(err,usr)=>{
                if(err) return res.status(403).json({msg:"Token is not valid"});
                req.user=usr;
                next();
            })
        }
        else{
            return res.status(401).json({msg:"user not authenticated!"})
        }
    },
    authenUserDefaultOrAdmin:(req,res,next)=>{
        middleController.verifyToken(req,res,()=>{
            if(req.user.id===req.params.id||req.user.admin)
            {
                next();
            }
            else{
                res.status(403).json({msg:"User not allow !"})
            }
        })
    }
}
module.exports=middleController