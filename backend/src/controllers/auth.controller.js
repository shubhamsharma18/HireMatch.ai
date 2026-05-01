const userModel=require("../models/user.model.js")
const blacklistTokenModel=require("../models/blacklistToken.model.js")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const cookieParser=require("cookie-parser")
const registerController= async(req,res)=>{
const {username,email,password}=req.body

if(!username || !email || !password){
    res.status(400).json({
        message:"Please provide username,email,password"
    })
}
const userExist=await userModel.findOne({
    $or:[{username},{email}]
})
if(userExist){
    return res.status(400).json({
        "message":"Account is already exist with this credentials"
    })
}
const hash=await bcrypt.hash(password,10)
const user=await userModel.create({
    username,
    email,
    password:hash
})
const token=jwt.sign(
    {id:user._id,username:user.username},
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
)

res.cookie("myToken",token)
res.status(201).json({
    "message":"User Registered",
    user:{
        id:user._id,
        username:user.username,
        email:user.email
    }
})
}
const loginController=async(req,res)=>{
const {email,password}=req.body
const user=await userModel.findOne({email})
if(!user){
    return res.status(400).json({
        "message":"email  is not found"
    })
}
const isMatch=await bcrypt.compare(password,user.password)
if(!isMatch){
    return res.status(400).json({
        "message":`invalid password`
    })
}

// const token=jwt.sign()
const token=jwt.sign(
    {id:user._id,username:user.username},
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
)

res.cookie("myToken",token)

res.status(200).json({
    "message":"Login Sucess",
      user:{
        id:user._id,
        username:user.username,
        email:user.email
    }

})
}



const logoutController=async(req,res)=>{
    const token=req.cookies.myToken
    if(token){
        await blacklistTokenModel.create({token})
    }
    res.clearCookie("myToken")
    res.status(200).json({
        "message":"User Logout Sucessfully"
    })
}



const getmeController=async(req,res)=>{

    const {id}=req.user

    const user = await userModel.findById(id)
    if(user){
       return res.status(200).json({
            "message":"Details fetched",
            user:{
                id:user._id,
                username:user.username,
                email:user.email,

            }
        })
    }
    res.status(400).json({
        "message":"User not found"
    })


}
module.exports={
    registerController,loginController,logoutController,getmeController
}