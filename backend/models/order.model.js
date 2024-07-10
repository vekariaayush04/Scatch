const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderItemSchema);

module.exports = Order;
