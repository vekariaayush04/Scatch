const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productname: String,
    price: Number,
    discount: Number,
    panelcolor: String,
    bgcolor: String,
    textcolor: String
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
