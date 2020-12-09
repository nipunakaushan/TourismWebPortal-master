const express = require('express');
const {createCustomer,getAllCustomers,getOneCustomer,updateCustomer,deleteCustomer} = require('../controllers/customerController');

const router = express.Router();

router
    .route('/')
    .post(createCustomer)
    .get(getAllCustomers);

router
    .route('/:id')
    .get(getOneCustomer)
    .patch(updateCustomer)
    .delete(deleteCustomer);

module.exports = router;