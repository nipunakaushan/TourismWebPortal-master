const express = require('express');
const {getAllVehicles,getOneVehicle,updateVehicle,deleteVehicle,createVehicle} = require('../controllers/vehicleController');

const router = express.Router();

router
    .route('/')
    .post(createVehicle)
    .get(getAllVehicles);

router
    .route('/:id')
    .get(getOneVehicle)
    .patch(updateVehicle)
    .delete(deleteVehicle);

module.exports = router;