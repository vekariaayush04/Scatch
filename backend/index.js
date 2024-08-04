const express = require('express');
const cors = require('cors')
const { connection } = require('./config/connection');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const app = express();

app.use(express.json());
app.use(cors())
app.use("/v1/user",userRouter);
app.use("/v1/admin",adminRouter);
connection();
app.get('/',(req,res)=>{
    res.send("hii");
})

app.listen(3000,()=>{
    console.log("app running");
});