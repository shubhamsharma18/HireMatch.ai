const express=require("express")

const router=express.Router()
const {registerController,loginController,logoutController,getmeController}=require("../controllers/auth.controller.js")
const authMiddleware=require("../middleware/auth.middleware.js")

router.post("/register",registerController)
router.post("/login",loginController)
router.get("/logout",logoutController)
router.get("/getme",authMiddleware,getmeController)
module.exports=router