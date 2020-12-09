const mongoose = require('mongoose');
const validator = require('validator');

const paymentSchema = new mongoose.Schema({
    customerId: {
        type : String,
        required: [true, 'Payment customer is required'],
    },
    customerName: {
        type: String,
        required: [true, 'Payment customer name is required'],
    },
    amount: {
        type: Number,
        required: [true, 'Payment amount is required'],
    },
    paymentDate: {
        type: Date,
        default: Date.now(),
    },
    paymentFor: {
        type: String,
        required: [true, 'Payment reason is required']
    }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;