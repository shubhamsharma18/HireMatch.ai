require("dotenv").config()
const express=require("express")
const cors=require("cors")
const cookieParser=require("cookie-parser")
const interviewRouter=require("./routes/interview.routes.js")   
const app =express()

// CORS configuration - handles both local development and production
// Replace your CORS configuration with this
const corsOptions = {
    origin: function(origin, callback) {
        // Allow all github.dev domains (Codespaces)
        const allowedOrigins = [
            process.env.FRONTEND_ORIGIN,
            "https://hire-match-ai-frontend.onrender.com",
            "https://special-winner-9774xggx9rg5hqrw-5174.app.github.dev",
            "https://special-winner-9774xggx9rg5hqrw-5175.app.github.dev",
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:5175"
        ];
        
        // Allow requests with no origin
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            // For Codespaces - allow any special-winner domain
            if (origin.includes('special-winner') && origin.includes('app.github.dev')) {
                callback(null, true);
            } else {
                console.log('CORS blocked origin:', origin);
                callback(null, true); // Temporarily allow for debugging
            }
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(cookieParser())

const authRoutes=require("./routes/auth.route.js")
app.use(express.json())
app.get("/check",(req,res)=>{
    res.json("checking")
})
app.get("/get",(req,res)=>{
    res.status(200).json("get request")
})  
app.use("/api/auth",authRoutes)
app.use("/api/interview",interviewRouter)

module.exports=app