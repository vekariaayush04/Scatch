const express = require('express');
const verifyToken = require('../../middlewares/loginmiddleware');
const User = require('../../models/user.model');
const Product = require('../../models/product.model');
const { z } = require('zod')

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

productRouter.get()

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
        
        const user = await User.findById(userId)

        if(!user){
            return res.status(500).json({
                message:"User not found"
            })
        }

        


    } catch (error) {
        return res.status(500).json({
            message:"Server Error"
        })
    }

})