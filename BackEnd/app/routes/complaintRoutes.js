const express = require('express');
const {getAllComplaints,getOneComplaint,updateComplaint,deleteComplaint,createComplaint} = require('../controllers/complaintController');

const router = express.Router();

router
    .route('/')
    .post(createComplaint)
    .get(getAllComplaints);

router
    .route('/:id')
    .get(getOneComplaint)
    .patch(updateComplaint)
    .delete(deleteComplaint);

module.exports = router;