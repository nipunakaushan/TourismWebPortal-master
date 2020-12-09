const mongoose = require('mongoose');
const validator = require('validator');

const complaintSchema = new mongoose.Schema({
    customerId: {
        type : String,
        required: [true, 'Complaint customer id is required'],
    },
    customerName: {
        type: String,
        required: [true, 'Complaint customer name is required'],
    },
    complaint: {
        type: String,
        required: [true, 'Complaint is required'],
    },
    response: {type: String,default: "---"},
    complaintDate: {
        type: Date,
        default: Date.now(),
    },
    status: {
        type: String,
        enum: ['responded', 'pending'],
        default: 'pending'
    }
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;