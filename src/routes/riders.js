const express = require('express');
const riderController = require('../controllers/ridersController')

const router = express.Router();

router.get('/:id', riderController.getOneRider);
router.get('/', riderController.getRiders);

module.exports = router;
