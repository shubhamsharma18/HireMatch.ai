require("dotenv").config()
const express=require("express")
const cors=require("cors")
const cookieParser=require("cookie-parser")

const app =express()
app.use(cors({
 origin:"https://special-winner-9774xggx9rg5hqrw-5173.app.github.dev", 
    
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]// Taaki Cookies exchange ho sakein
}));
app.use(cookieParser())

const authRoutes=require("./routes/auth.route.js")
app.use(express.json())
// app.get("/check",(req,res)=>{
//     res.json("checking")
// })

app.use("/api/auth",authRoutes)

module.exports=app