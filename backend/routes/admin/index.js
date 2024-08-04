const {Router} = require('express');
const { router } = require('../auth');
// const productRouter = require('./product');
// const cartRouter = require('./cart');

const adminRouter = Router();

//adminRouter.use("/auth",router)
// adminRouter.use("/product",productRouter)
//adminRouter.use("/cart",cartRouter)

adminRouter.get("/",(req,res)=>{
    res.send("hi from user");
})

module.exports = adminRouter;