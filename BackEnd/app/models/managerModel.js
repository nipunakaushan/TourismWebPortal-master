const mongoose = require('mongoose');
const validator = require('validator');

const managerSchema = new mongoose.Schema({
    name: {
        type : String,
        required: [true, 'Manager name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Manager email is required'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    telNo: {
        type: String,
        required: [true, 'Manager tel no. is required'],
        minlength: 10,
        maxlength:10,
        unique: true
    },
    salary: {
        type: Number,
        required: [true, 'Manager Salary is required'],
    },
    qualification: {
        type: String,
        enum: ['degree', 'diploma', 'other'],
        default: 'other'
    }
   
});

const Manager = mongoose.model('Manager', managerSchema);

module.exports = Manager;