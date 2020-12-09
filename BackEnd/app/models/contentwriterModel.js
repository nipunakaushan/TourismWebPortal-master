const mongoose = require('mongoose');
const validator = require('validator');

const contentWriterSchema = new mongoose.Schema({
    name: {
        type : String,
        required: [true, 'ContentWriter name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'ContentWriter email is required'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    telNo: {
        type: String,
        required: [true, 'ContentWriter tel no. is required'],
        minlength: 10,
        maxlength:10,
        unique: true
    },
    salary: {
        type: Number,
        required: [true, 'ContentWriter Salary is required'],
    },
    contentType: {
        type: String,
        enum: ['user-generated', 'target', 'video'],
        default: 'user-generated'
    },
    contentDescription: String
});

const ContentWriter = mongoose.model('ContentWriter', contentWriterSchema);

module.exports = ContentWriter;