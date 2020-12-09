const mongoose = require('mongoose');
const validator = require('validator');

const partSchema = new mongoose.Schema({
    mechanicId: {
        type: String,
        required: [true, 'Mechanic Id is required']
    },
    mechanicName: {
        type: String,
        required: [true, 'Mechanic name is required']
    },
    type: {
        type : String,
        enum: ['suv','saloon','4x4','tuk', 'van', 'bus'],
        required: [true, 'Vehicle Part type is required'],
        default: 'van'
    },
    name: {
        type: String,
        required: [true, 'Vehicle Part name is required'],
    },
    cost: {
        type: Number,
        required: [true, 'Vehicle Part cost is required'],
    },
    repairDate: {
        type: Date,
        default: Date.now(),
    },
    image: String,
});

const Part = mongoose.model('Part', partSchema);

module.exports = Part;