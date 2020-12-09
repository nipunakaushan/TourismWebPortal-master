const mongoose = require('mongoose');
const validator = require('validator');

const mechanicSchema = new mongoose.Schema({
    name: {
        type : String,
        required: [true, 'Mechanic name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Mechanic email is required'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    telNo: {
        type: String,
        required: [true, 'Mechanic tel no. is required'],
        minlength: 10,
        maxlength:10,
        unique: true
    },
    salary: {
        type: Number,
        required: [true, 'Mechanic Salary is required'],
    },
    qualification: {
        type: String,
        enum: ['degree', 'diploma', 'other'],
        default: 'other'
    },
    vehicleType:{
        type: String,
        enum: ['suv', 'saloon', 'long', 'all'],
        default: 'all'
    },
    vehicleSection: String

   
});

const Mechanic = mongoose.model('Mechanic', mechanicSchema);

module.exports = Mechanic;