const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    products: [
        {
            productId: {type: String},
            quantitt: {type: Number, default: 1}
        }
    ],
    address: {type: String, required: true},
    amount: {type: Number, required: true},
    status: {type: String, default: 'pending', required: true}

}, {timeStamps: true});

export default mongoose.model('Order', orderSchema);