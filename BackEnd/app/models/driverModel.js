const mongoose = require('mongoose');
const validator = require('validator');

const driverSchema = new mongoose.Schema({
    name: {
        type : String,
        required: [true, 'Driver name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Driver email is required'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    telNo: {
        type: String,
        required: [true, 'Driver tel no. is required'],
        minlength: 10,
        maxlength:10,
        unique: true
    },
    salary: {
        type: Number,
        required: [true, 'Driver Salary is required'],
    },
    licenseNo: String,
    vehicleType:{
        type: String,
        enum: ['suv', 'saloon', 'long', 'all'],
        default: 'all'
    }
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;