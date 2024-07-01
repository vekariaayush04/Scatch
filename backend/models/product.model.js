const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productname : String,
    price :Number,
    discount : Number,
    panelcolor : String,
    bgcolor : String,
    textcolor : String
})

const Product = mongoose.model("product" , productSchema);

module.exports = Product;