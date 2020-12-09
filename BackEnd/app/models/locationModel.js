const mongoose = require('mongoose');
const validator = require('validator');

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Location name is required'],
    },
    description: {
        type: String,
        required: [true, 'Location description is required']
    },
    latitudes: {
        type: String,
        required: [true, 'Location latitude is required'],
    },
    longitudes: {
        type: String,
        required: [true, 'Location longitude is required'],
    }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;