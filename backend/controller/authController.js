const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRound = 10;
let refreshTokens=[]
const authController = {
    resigterUser: async (req, res, next) => {
        try {
            const salt = await bcrypt.genSalt(saltRound);
            const hash = await bcrypt.hash(req.body.password, salt);
            const newUser = new User({
                username: req.body.username,
                password: hash,
                email: req.body.email
            });
            const user = await newUser.save();
            res.status(200).json({
                msg: 'sucess',
                data: user
            });
        } catch (err) {
            res.status(500).json({
                msg: 'error',
                data: err
            });
        }
    },
    loginUser: async (req, res, next) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                res.status(404).json({
                    msg: 'Invalid User',
                })
            };
            const result = await bcrypt.compare(req.body.password, user.password);
            !result && res.status(404).json({
                msg: 'Password wrong'
            });
            
            if (user && result) {
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                refreshTokens.push(refreshToken);
                res.cookie('refreshToken',refreshToken,{
                    samesite:true,
                    secure:false,
                    httpOnly:true,
                    path:'/',
                    sameSite:'strict'
                })
                res.status(200).json({
                    msg: 'Login sucess',
                    data: result,
                    access: accessToken,
                });
            }
        } catch (err) {
            res.status(500).json({
                msg: 'error',
                data: err
            });
        }
    },
    logOut:(req,res)=>{
        res.clearCookie('refreshToken');
        refreshTokens=refreshTokens.filter(token=>req.cookies.refreshToken!==token);
        res.status(200).json({msg:'Logout sucess!'});
    },
    generateAccessToken: (user) => {
        return jwt.sign({
            id: user._id,
            admin: user.admin
        },
            process.env.ACCESS_TOKEN_KEY,
            {
                expiresIn: "30s"
            });
    },
    generateRefreshToken: (user) => {
        return jwt.sign({
            id: user._id,
            admin: user.admin,
        },
            process.env.REFRESH_TOKEN_KEY, {
            expiresIn: '30d'
        });
    },
    requestRefreshToken:async(req,res,next)=>{
        let currentRefreshToken=req.cookies.refreshToken;
        if(!currentRefreshToken){
            return  res.status(401).json({msg:'Account not authenticated !'});
        }
        if(!refreshTokens.includes(currentRefreshToken)){
            return res.status(403).json({msg:'Refresh Token is not valid!'})
        }
        jwt.verify(currentRefreshToken,process.env.REFRESH_TOKEN_KEY,(err,usr)=>{
            if(err){
                return res.status(500).json({msg:'error',data:err})
            }
            refreshTokens=refreshTokens.filter((token)=>currentRefreshToken!==token);
            const newAccessToken=authController.generateAccessToken(usr);
            const newRefreshToken=authController.generateRefreshToken(usr);
            refreshTokens.push(newRefreshToken);
            res.cookie('refreshToken',newRefreshToken,{
                samesite:true,
                secure:false,
                httpOnly:true,
                path:'/',
                sameSite:'strict'
            })
            return res.status(200).json({
                msg:'Refresh Token update!',
                newAccessToken:newAccessToken,
                RefreshTokens:refreshTokens
            })
        })
    }
}

module.exports = authController;
