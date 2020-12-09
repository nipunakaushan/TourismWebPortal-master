const Vehicle = require('../models/vehicleModel');

exports.createVehicle = async (req,res) => {
    try  {
        const newVehicle = await Vehicle.create(req.body);

        res.status(200).json({
            status: 'Success',
            data: newVehicle
        });
    }catch(err){
        res.status(400).json({
            status: 'Fail',
            message: 'Invalid data',
            error: err
        });
    }
};

exports.getAllVehicles = async (req,res) => {
    try {
        const vehicles = await Vehicle.find();

        res.status(200).json({
            status: 'Success',
            result: vehicles.length,
            data: vehicles
        });
    }catch(err){
        res.status(400).json({
            status: 'Fail',
            message: 'Server error',
            error: err
        });
    }
};

exports.getOneVehicle = async (req,res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);

        res.status(200).json({
            status: 'Success',
            data: vehicle
        });
    }catch(err){
        res.status(400).json({
            status: 'Fail',
            message: 'Given id is not exist',
            error: err
        });
    }
};

exports.updateVehicle = async (req,res) => {
    try { 
        const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'Success',
            data: updatedVehicle
        });
    }catch(err) {
        res.status(400).json({
            status: 'Fail',
            message: 'Given id is not exist',
            error: err
        });
    }
};

exports.deleteVehicle = async (req,res) => {
    try {
        await Vehicle.findByIdAndDelete(req.params.id);

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