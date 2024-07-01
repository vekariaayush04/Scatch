const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String,
    phoneNumber : Number,
    cart : {
        type : Array
    },
    orders : {
        type : Array
    }
})

const User = mongoose.model("user" , userSchema);


module.exports = User;