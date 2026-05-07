
require("dotenv").config();
const app=require("./src/app.js")
// const invokeAI=require("./src/services/ai.service.js")  

const connectDB=require("./src/config/db.js")

connectDB()
const PORT=process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`server is running http://localhost:${PORT}`)
})