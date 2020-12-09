const Location = require('../models/locationModel');

exports.createLocation = async (req,res) => {
    try  {
        const newLocation = await Location.create(req.body);

        res.status(200).json({
            status: 'Success',
            data: newLocation
        });
    }catch(err){
        res.status(400).json({
            status: 'Fail',
            message: 'Invalid data',
            error: err
        });
    }
};

exports.getAllLocations = async (req,res) => {
    try {
        const locations = await Location.find();

        res.status(200).json({
            status: 'Success',
            result: locations.length,
            data: locations
        });
    }catch(err){
        res.status(400).json({
            status: 'Fail',
            message: 'Server error',
            error: err
        });
    }
};

exports.getOneLocation = async (req,res) => {
    try {
        const location = await Location.findById(req.params.id);

        res.status(200).json({
            status: 'Success',
            data: location
        });
    }catch(err){
        res.status(400).json({
            status: 'Fail',
            message: 'Given id is not exist',
            error: err
        });
    }
};

exports.updateLocation = async (req,res) => {
    try { 
        const updatedLocation = await Location.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'Success',
            data: updatedLocation
        });
    }catch(err) {
        res.status(400).json({
            status: 'Fail',
            message: 'Given id is not exist',
            error: err
        });
    }
};

exports.deleteLocation = async (req,res) => {
    try {
        await Location.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'Success',
            data: null,
            message: 'Successfully deleted'
        });
    }catch(err) {
        res.status(400).json({
            status: 'Fail',
            message: 'Given id is not exist',
            error: err
        });
    }
};