const mongoose = require('mongoose');
const validator = require('validator');

const packagesSchema = new mongoose.Schema({
    name: {
        type : String,
        required: [true, 'Packages name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Packages description is required'],
        minlength: 4,
    },
    price: {
        type: Number,
        required: [true, 'Packages price is required'],
    },
    includes: {
        type: String,
        required: [true, 'Packages includes are required'],
    },
});

const Packages = mongoose.model('Packages', packagesSchema);

module.exports = Packages;
