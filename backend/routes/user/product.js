const express = require('express');
const verifyToken = require('../../middlewares/loginmiddleware');
const User = require('../../models/user.model');
const Product = require('../../models/product.model');

const productRouter = express.Router();

productRouter.get("/",verifyToken,async (req,res)=>{
    const data = await User.findById(req.userId);
    res.send("hi from product after login" + data);
})

productRouter.get("/allproducts",verifyToken,async (req,res) => {
    const products = await Product.find({});
    res.send(products);
})

module.exports = productRouter