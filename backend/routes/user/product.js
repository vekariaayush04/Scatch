const express = require('express');
const verifyToken = require('../../middlewares/loginmiddleware');
const User = require('../../models/user.model');
const Product = require('../../models/product.model');

const productRouter = express.Router();

productRouter.get("/allproducts",verifyToken,async (req,res) => {
    const userData = await User.findById(req.userId);
    const products = await Product.find({});
    console.log(userData);
    res.send({userData, products});
})

productRouter.get("/:id",verifyToken,async (req,res) => {
    const id = req.params.id;
    console.log(id);
    console.log(typeof(id));
    const product = await Product.findById(id);

    res.send(product)

})
module.exports = productRouter