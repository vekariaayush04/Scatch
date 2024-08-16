const express = require('express');
const verifyToken = require('../../middlewares/loginmiddleware');
const User = require('../../models/user.model');
const Product = require('../../models/product.model');
const { z } = require('zod');
const multer  = require('multer')
const uploadImage = require('../../utils/uploadImage');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const productRouter = express.Router();

const productSchema = z.object({
    productname: z.string().max(15),
    price: z.any(),
    discount: z.any(),
    panelcolor: z.string(),
    bgcolor: z.string(),
    textcolor: z.string()
})


productRouter.post('/addProduct',verifyToken,upload.single('productImage') ,async (req,res) => {

    const userId = req.userId;
    const file = req.file;
    
    const { 
        productname,
        price,
        discount,
        panelcolor,
        bgcolor,
        textcolor 
    } = req.body;
    
    const validData = productSchema.safeParse({ 
        productname,
        price,
        discount,
        panelcolor,
        bgcolor,
        textcolor 
    })  
        
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
        const result =await uploadImage(file)
        console.log(result);
        
        const newProduct = new Product({
            imageurl:result.secure_url,
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