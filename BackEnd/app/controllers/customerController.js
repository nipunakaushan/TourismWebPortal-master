const Customer = require('../models/customerModel');

exports.createCustomer = async (req,res) => {
    try  {
        const newCustomer = await Customer.create(req.body);

        res.status(200).json({
            status: 'Success',
            data: newCustomer
        });
    }catch(err){
        res.status(400).json({
            status: 'Fail',
            message: 'Invalid data',
            error: err
        });
    }
};

exports.getAllCustomers = async (req,res) => {
    try {
        const customers = await Customer.find();

        res.status(200).json({
            status: 'Success',
            result: customers.length,
            data: customers
        });
    }catch(err){
        res.status(400).json({
            status: 'Fail',
            message: 'Server error',
            error: err
        });
    }
};

exports.getOneCustomer = async (req,res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        res.status(200).json({
            status: 'Success',
            data: customer
        });
    }catch(err){
        res.status(400).json({
            status: 'Fail',
            message: 'Given id is not exist',
            error: err
        });
    }
};

exports.updateCustomer = async (req,res) => {
    try { 
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'Success',
            data: updatedCustomer
        });
    }catch(err) {
        res.status(400).json({
            status: 'Fail',
            message: 'Given id is not exist',
            error: err
        });
    }
};

exports.deleteCustomer = async (req,res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);

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