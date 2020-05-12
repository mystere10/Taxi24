const express = require('express');
const driverController = require('../controllers/driversController');

const router = express.Router();

router.get('/available', driverController.getAvailableDrivers);
router.get('/', driverController.getDrivers);

module.exports = router;