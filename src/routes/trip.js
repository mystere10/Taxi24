const express = require('express');
const tripController = require('../controllers/tripController')
const helpers = require('../helpers/checkUsers');

const router = express.Router();

router.patch('/:tripId/:driverId/activate', tripController.activateTrip);
router.patch('/:id/complete', tripController.completeTrip);
router.get('/active', tripController.activeTrips);
router.post('/new', helpers.checkDriver, helpers.checkRider, tripController.newTrip);

module.exports = router;
