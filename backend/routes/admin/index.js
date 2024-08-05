const {Router} = require('express');
const productRouter = require('./product');
// const cartRouter = require('./cart');

const adminRouter = Router();

//adminRouter.use("/auth",router)
adminRouter.use("/product",productRouter)
//adminRouter.use("/cart",cartRouter)

module.exports = adminRouter;