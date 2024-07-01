const {Router} = require('express');
const { router } = require('./auth');

const userRouter = Router();

userRouter.use("/auth",router)

userRouter.get("/",(req,res)=>{
    res.send("hi from user");
})

module.exports = userRouter;