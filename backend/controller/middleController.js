const jwt=require('jsonwebtoken')
const middleController={
    verifyToken:(req,res,next)=>{
        const accessToken=req.headers.token;
        if(accessToken){
            jwt.verify(accessToken,process.env.ACCESS_TOKEN_KEY,(err,usr)=>{
                err&&res.status(403).json({msg:"Token is not valid"});
                req.user=usr;
                next();
            })
        }
        else{
            res.status(401).json({msg:"user not authenticated!"})
        }
    }
}
module.exports=middleController