const express = require('express');
const verifyToken = require('../../middlewares/loginmiddleware');
const User = require('../../models/user.model');
const Product = require('../../models/product.model');
const { z } = require('zod');
const uploadImage = require('../../utils/uploadImage');

const productRouter = express.Router();

const productSchema = z.object({
    imageurl: z.string().url(),
    productname: z.string().max(15),
    price: z.number(),
    discount: z.number(),
    panelcolor: z.string(),
    bgcolor: z.string(),
    textcolor: z.string()
})


productRouter.post('/addProduct',verifyToken,async (req,res) => {

    const userId = req.userId;

    const { imageurl,
        productname,
        price,
        discount,
        panelcolor,
        bgcolor,
        textcolor } = req.body;

    const validData = productSchema.safeParse({ imageurl,
        productname,
        price,
        discount,
        panelcolor,
        bgcolor,
        textcolor })  
        
    if(!validData.success){
        return res.status(404).json({
            message:"Invalid Schema"
        })
    }

    try {
        
        const user = await User.findById(userId).populate("products")

        if(!user){
            return res.status(500).json({
                message:"User not found"
            })
        }

        if(!user.isAdmin){
            return res.status(500).json({
                message:"User is not Admin"
            })
        }
        const result = uploadImage()
        
        const newProduct = new Product({
            imageurl:result.url,
            productname,
            price,
            discount,
            panelcolor,
            bgcolor,
            textcolor
        })

        newProduct.save()

        user.products.push(newProduct)

        await user.save()

        res.status(200).json({ message: 'Product added to data', products: user.products });

    } catch (error) {
        return res.status(500).json({
            message:"Server Error"+error
            
        })
    }

})

module.exports = productRouter