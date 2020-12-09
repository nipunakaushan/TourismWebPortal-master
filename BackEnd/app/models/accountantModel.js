const mongoose = require('mongoose');
const validator = require('validator');

const accountantSchema = new mongoose.Schema({
    name: {
        type : String,
        required: [true, 'Accountant name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Accountant email is required'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    telNo: {
        type: String,
        required: [true, 'Accountant tel no. is required'],
        minlength: 10,
        maxlength:10,
        unique: true
    },
    salary: {
        type: Number,
        required: [true, 'Accountant Salary is required'],
    },
    qualification: {
        type: String,
        enum: ['degree', 'diploma', 'other'],
        default: 'other'
    }
   
});

const Accountant = mongoose.model('Accountant', accountantSchema);

module.exports = Accountant;