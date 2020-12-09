const Complaint = require('../models/complaintsModel');

exports.createComplaint = async (req,res) => {
    try  {
        const newComplaint = await Complaint.create(req.body);

        res.status(200).json({
            status: 'Success',
            data: newComplaint
        });
    }catch(err){
        res.status(400).json({
            status: 'Fail',
            message: 'Invalid data',
            error: err
        });
    }
};

exports.getAllComplaints = async (req,res) => {
    try {
        const complaints = await Complaint.find();

        res.status(200).json({
            status: 'Success',
            result: complaints.length,
            data: complaints
        });
    }catch(err){
        res.status(400).json({
            status: 'Fail',
            message: 'Server error',
            error: err
        });
    }
};

exports.getOneComplaint = async (req,res) => {
    try {
        const complaint = await Complaint.find({ customerId: req.params.id });

        res.status(200).json({
            status: 'Success',
            data: complaint
        });
    }catch(err){
        res.status(400).json({
            status: 'Fail',
            message: 'Given id is not exist',
            error: err
        });
    }
};

exports.updateComplaint = async (req,res) => {
    try { 
        const updatedComplaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'Success',
            data: updatedComplaint
        });
    }catch(err) {
        res.status(400).json({
            status: 'Fail',
            message: 'Given id is not exist',
            error: err
        });
    }
};

exports.deleteComplaint = async (req,res) => {
    try {
        await Complaint.findByIdAndDelete(req.params.id);

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