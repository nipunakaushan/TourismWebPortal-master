const mongoose = require('mongoose');
const validator = require('validator');

const adminSchema = new mongoose.Schema({
    name: {
        type : String,
        required: [true, 'Admin name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Admin email is required'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    telNo: {
        type: String,
        required: [true, 'Admin tel no. is required'],
        minlength: 10,
        maxlength:10,
        unique: true
    },
    salary: {
        type: Number,
        required: [true, 'Admin Salary is required'],
    },
    qualification: {
        type: String,
        enum: ['degree', 'diploma', 'other'],
        default: 'other'
    }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;