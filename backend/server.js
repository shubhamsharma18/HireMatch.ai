
require("dotenv").config();
const app=require("./src/app.js")
// const { testGeminiConnection } = require("./src/services/ai.service.js")

const connectDB=require("./src/config/db.js")

connectDB()
const PORT=process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`server is running on port http://localhost:${PORT} (accessible on all interfaces)`)
    
    // Test Gemini API on startup
    // setTimeout(() => {
    //     testGeminiConnection();
    // }, 1000);
})