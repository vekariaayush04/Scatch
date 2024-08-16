const express = require('express');
const verifyToken = require('../../middlewares/loginmiddleware');
const User = require('../../models/user.model');
const Cart = require('../../models/cart.model');
const Product = require('../../models/product.model'); 
const cartRouter = express.Router();

cartRouter.post("/addToCart", verifyToken, async (req, res) => {
    const userId = req.userId;
    const { productId, quantity } = req.body;

    try {
        const user = await User.findById(userId).populate({
            path: 'cart',
            populate: {
                path: 'product'
            }
        });
        console.log(user);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the product in the user's cart
        let cartItem = user.cart.find(item => item.product._id.toString() === productId);

        if (cartItem) {
            cartItem.quantity = quantity;
            await cartItem.save();
        } else {
            // Create a new cart item and add it to the user's cart
            cartItem = new Cart({
                product: productId,
                quantity: quantity
            });
            await cartItem.save();

            user.cart.push(cartItem._id);
            await user.save();
        }

        res.status(200).json({ message: 'Product added to cart', cart: user.cart });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

cartRouter.post("/removeFromCart", verifyToken, async (req, res) => {
    const userId = req.userId;
    const { productId } = req.body;

    try {
        const user = await User.findById(userId).populate({
            path: 'cart',
            populate: {
                path: 'product'
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(user);
        // Find the cart item to remove
        let cartItem = user.cart.find(item => item.product._id.toString() === productId);
        console.log(cartItem);
        if (!cartItem) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        // Remove the cart item from the user's cart array
        user.cart = user.cart.filter(item => item._id.toString() !== cartItem._id.toString());
        console.log(user.cart);
        
        // Save the user without the cart item
        await user.save();

        // Remove the cart item document
        await Cart.findByIdAndDelete(cartItem._id)

        res.status(200).json({ message: 'Product removed from cart', cart: user.cart });
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


cartRouter.get("/cartItems",verifyToken,async (req,res) => {
    const userId = req.userId;

    try {

        const user =  await User.findById(userId).populate({
            path: 'cart',
            populate : { path : 'product'}
        })

        if(!user){
                res.status(404).json({message : "user not found"})
        }
        if(user.cart === null){
            res.status(404).json({message:'Cart is Empty'})
        }
        res.send(user.cart)

    } catch (error) {
        res.status(500).json({message :'Internal Server Error'})
    }
})

module.exports = cartRouter;

