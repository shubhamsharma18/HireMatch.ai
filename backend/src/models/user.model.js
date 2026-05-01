const mongoose=require("mongoose")

const userSchema= new mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:[true,"username is already exist"]
    },
     email:{
        type:String,
        required:true,
        unique:[true,"username is already exist"]
    },
     password:{
        type:String,
        required:[true,"Password is required"]
        
    }
})


const userModel=mongoose.model("user",userSchema)
module.exports=userModel