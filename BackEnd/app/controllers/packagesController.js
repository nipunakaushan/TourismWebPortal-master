const Package = require('../models/packagesModel');

exports.createPackage = async (req,res) => {
    try  {
        const newPackage = await Package.create(req.body);

        res.status(200).json({
            status: 'Success',
            data: newPackage
        });
    }catch(err){
        res.status(400).json({
            status: 'Fail',
            message: 'Invalid data',
            error: err
        });
    }
};

exports.getAllPackages = async (req,res) => {
    try {
        const packages = await Package.find();

        res.status(200).json({
            status: 'Success',
            result: packages.length,
            data: packages
        });
    }catch(err){
        res.status(400).json({
            status: 'Fail',
            message: 'Server error',
            error: err
        });
    }
};

exports.getOnePackage = async (req,res) => {
    try {
        const package = await Package.findById(req.params.id);

        res.status(200).json({
            status: 'Success',
            data: package
        });
    }catch(err){
        res.status(400).json({
            status: 'Fail',
            message: 'Given id is not exist',
            error: err
        });
    }
};

exports.updatePackage = async (req,res) => {
    try { 
        const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'Success',
            data: updatedPackage
        });
    }catch(err) {
        res.status(400).json({
            status: 'Fail',
            message: 'Given id is not exist',
            error: err
        });
    }
};

exports.deletePackage = async (req,res) => {
    try {
        await Package.findByIdAndDelete(req.params.id);

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