const {Router} = require('express');
const { router } = require('../auth');
const productRouter = require('./product');
const cartRouter = require('./cart');
const verifyToken = require('../../middlewares/loginmiddleware');
const User = require('../../models/user.model');

const userRouter = Router();

userRouter.use("/auth",router)
userRouter.use("/product",productRouter)
userRouter.use("/cart",cartRouter)

userRouter.get("/",verifyToken,async (req,res)=>{
    const userData = await User.findById(req.userId);
    
    console.log(userData);
    res.send({
        username:userData.username,
        email:userData.email,
        isAdmin:userData.isAdmin,
        isLoggedIn:true
    });
})
module.exports = userRouter;