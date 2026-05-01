
require("dotenv").config();
const cors=require("cors")

const app=require("./src/app.js")

app.use(cors())
const connectDB=require("./src/config/db.js")

connectDB()
const PORT=process.env.PORT || 4000
app.listen(PORT,(req,res)=>{
    console.log("server is running http://localhost:3000")

})