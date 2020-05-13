const express = require('express');
const tripController = require('../controllers/tripController')
const helpers = require('../helpers/checkUsers');

const router = express.Router();

router.post('/new', helpers.checkDriver, helpers.checkRider, tripController.newTrip);

module.exports = router;
