const express = require('express');
const {getAllPayments,createPayment,getMonthlyPayments,getTypePayments} = require('../controllers/paymentController');

const router = express.Router();

router
    .route('/monthlyTypeReport')
    .get(getTypePayments);

router
    .route('/monthlyPaymentReport')
    .get(getMonthlyPayments);

router
    .route('/')
    .post(createPayment)
    .get(getAllPayments);

module.exports = router;