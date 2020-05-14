const express = require('express');
const driverController = require('../controllers/driversController');

const router = express.Router();

router.post('/available/distance', driverController.driversInDistance);
router.get('/:id/closest', driverController.getClosedDrivers)
router.get('/available', driverController.getAvailableDrivers);
router.get('/:id', driverController.getOneDriver);
router.get('/', driverController.getDrivers);

module.exports = router;