const jwt=require("jsonwebtoken")
const blacklistTokenModel = require("../models/blacklistToken.model")

const authMiddleware=async(req,res,next)=>{

const token=req.cookies.myToken

if(!token){
    res.status(400).json({
        "message":"Token is not available"
    })
}
const isTokenBlacklist=await blacklistTokenModel.findOne({token})

if(isTokenBlacklist){
    res.status(400).json({
        "message":"Token is blacklisted"
    })
}
try {
    const decoded=await jwt.verify(token,process.env.JWT_SECRET)
    
    req.user=decoded
    next()
} catch (error) {
    res.status(400).json({
        "message":"Invalid Token"
    })
}

}

module.exports=authMiddleware