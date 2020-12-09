const Part = require('../models/partModel');

exports.createPart = async (req,res) => {
    try  {
        const newPart = await Part.create(req.body);

        res.status(200).json({
            status: 'Success',
            data: newPart
        });
    }catch(err){
        res.status(400).json({
            status: 'Fail',
            message: 'Invalid data',
            error: err
        });
    }
};

exports.getAllParts = async (req,res) => {
    try {
        const parts = await Part.find();

        res.status(200).json({
            status: 'Success',
            result: parts.length,
            data: parts
        });
    }catch(err){
        res.status(400).json({
            status: 'Fail',
            message: 'Server error',
            error: err
        });
    }
};

exports.getOnePart = async (req,res) => {
    try {
        const part = await Part.findById(req.params.id);

        res.status(200).json({
            status: 'Success',
            data: part
        });
    }catch(err){
        res.status(400).json({
            status: 'Fail',
            message: 'Given id is not exist',
            error: err
        });
    }
};

exports.updatePart = async (req,res) => {
    try { 
        const updatedPart = await Part.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'Success',
            data: updatedPart
        });
    }catch(err) {
        res.status(400).json({
            status: 'Fail',
            message: 'Given id is not exist',
            error: err
        });
    }
};

exports.deletePart = async (req,res) => {
    try {
        await Part.findByIdAndDelete(req.params.id);

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