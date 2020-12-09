const mongoose = require('mongoose');
const validator = require('validator');

const guideSchema = new mongoose.Schema({
    name: {
        type : String,
        required: [true, 'Guide name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Guide email is required'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    telNo: {
        type: String,
        required: [true, 'Guide tel no. is required'],
        minlength: 10,
        maxlength:10,
        unique: true
    },
    salary: {
        type: Number,
        required: [true, 'Guide Salary is required'],
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male'
    },
    languages: {
        type: String,
        default: 'English'
    },
});

const Guide = mongoose.model('Guide', guideSchema);

module.exports = Guide;