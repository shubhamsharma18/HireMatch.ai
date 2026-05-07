require("dotenv").config()
const express=require("express")
const cors=require("cors")
const cookieParser=require("cookie-parser")
const interviewRouter=require("./routes/interview.routes.js")   
const app =express()

app.use(cors({
    origin: process.env.FRONTEND_ORIGIN || true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))
app.use(cookieParser())

const authRoutes=require("./routes/auth.route.js")
app.use(express.json())
// app.get("/check",(req,res)=>{
//     res.json("checking")
// })
app.get("/get",(req,res)=>{
    res.status(200).json("get request")
})  
app.use("/api/auth",authRoutes)
app.use("/api/interview",interviewRouter)

module.exports=app