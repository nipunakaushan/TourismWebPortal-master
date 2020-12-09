const express = require('express');
const {getAllParts,getOnePart,updatePart,deletePart,createPart,getAllPartsByMechanic} = require('../controllers/partController');

const router = express.Router();

router
    .route('/')
    .post(createPart)
    .get(getAllParts);

router
    .route('/:id')
    .get(getOnePart)
    .patch(updatePart)
    .delete(deletePart);

module.exports = router;