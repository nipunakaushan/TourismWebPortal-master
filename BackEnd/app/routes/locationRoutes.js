const express = require('express');
const {getAllLocations,getOneLocation,updateLocation,deleteLocation,createLocation} = require('../controllers/locationController');

const router = express.Router();

router
    .route('/')
    .post(createLocation)
    .get(getAllLocations);

router
    .route('/:id')
    .get(getOneLocation)
    .patch(updateLocation)
    .delete(deleteLocation);

module.exports = router;