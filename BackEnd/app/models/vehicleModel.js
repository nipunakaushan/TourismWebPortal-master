const mongoose = require('mongoose');
const validator = require('validator');

const vehicleSchema = new mongoose.Schema({
    type: {
        type : String,
        enum: ['suv','saloon','4x4','tuk', 'van', 'bus'],
        required: [true, 'Vehicle type is required'],
        default: 'van'
    },
    regNo: {
        type: String,
        required: [true, 'Vehicle Reg No. is required'],
        unique: true,
    },
    range: {
        type: Number,
        required: [true, 'Vehicle Distance Range is required'],
    },
    photo: String
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;