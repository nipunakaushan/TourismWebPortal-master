const express = require('express');
const {getAllPackages,getOnePackage,updatePackage,deletePackage,createPackage} = require('../controllers/packagesController');

const router = express.Router();

router
    .route('/')
    .post(createPackage)
    .get(getAllPackages);

router
    .route('/:id')
    .get(getOnePackage)
    .patch(updatePackage)
    .delete(deletePackage);

module.exports = router;