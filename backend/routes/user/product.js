const express = require('express');
const verifyToken = require('../../middlewares/loginmiddleware');
const User = require('../../models/user.model');
const Product = require('../../models/product.model');

const productRouter = express.Router();

productRouter.get("/",verifyToken,async (req,res)=>{
    const data = await User.findById(req.userId);
    res.send(data);
})

productRouter.get("/allproducts",verifyToken,async (req,res) => {
    const userData = await User.findById(req.userId);
    const products = await Product.find({});
    console.log(userData);
    res.send({userData, products});
})

module.exports = productRouter