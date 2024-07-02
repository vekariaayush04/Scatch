const {Router} = require('express');
const { router } = require('./auth');
const productRouter = require('./product');

const userRouter = Router();

userRouter.use("/auth",router)
userRouter.use("/product",productRouter)

userRouter.get("/",(req,res)=>{
    res.send("hi from user");
})

module.exports = userRouter;