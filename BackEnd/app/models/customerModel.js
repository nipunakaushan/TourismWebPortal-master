const mongoose = require('mongoose');
const validator = require('validator');

const customerSchema = new mongoose.Schema({
    name: {
        type : String,
        required: [true, 'Customer name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Customer email is required'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    nic: {
        type: String,
        required: [true, 'Customer nic is required'],
        unique: true
    },
    telNo: {
        type: String,
        required: [true, 'Customer tel no. is required'],
        minlength: 10,
        maxlength:10,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
      },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
          // This only works on CREATE and SAVE!!!
          validator: function(el) {
            return el === this.password;
          },
          message: 'Passwords are not the same!'
        }
    },
    package: String,
    paymentType: String,
    paymentAmount: Number,
    paymentDate: Date
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;