const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    phoneNumber: Number,
    isAdmin: {
        type: Boolean,
        default: false
    },
    cart: [{
        type: Schema.Types.ObjectId,
        ref: 'Cart' // Reference to the Cart model
    }],
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order' // Reference to the Order model
    }],
    products: [{
        type : Schema.Types.ObjectId,
        ref: "Product"
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
