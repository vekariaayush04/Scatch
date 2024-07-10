const {Router} = require('express');
const { router } = require('./auth');
const productRouter = require('./product');
const cartRouter = require('./cart');

const userRouter = Router();

userRouter.use("/auth",router)
userRouter.use("/product",productRouter)
userRouter.use("/cart",cartRouter)

userRouter.get("/",(req,res)=>{
    res.send("hi from user");
})

module.exports = userRouter;