const TripModel = require('../model/tripModel');

exports.newTrip = (req, res, next) => {
    const rider = req.body.rider;
    const driver = req.body.driver;
    const departure = req.body.from;
    const destination = req.body.destination;
    const trip_distance = req.body.trip_distance;
    const trip_status = "pending";

    const driverId = req.driverId;
    const riderId = req.rider;

    const newTrip = new TripModel(driverId, riderId, departure, destination, trip_distance, trip_status);
    newTrip.newTrip().then((result) => {
        if(result.rows.length > 0){
            res.status(201).json({
                message: 'Trip created',
                trip: Object.assign({}, result.rows, {driver: driver, rider: rider})
            })
        }
    }).catch((error) => {
        res.status(500).json({
            message: 'An error occured',
            error: error
        });
    })
}