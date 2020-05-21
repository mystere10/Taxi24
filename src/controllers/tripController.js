const fs = require('fs');
const path = require('path');
const TripModel = require('../model/tripModel');
const p = require('../helpers/path')
const calCulateCharges = require('../helpers/calculateCharges')

exports.newTrip = (req, res, next) => {
    const rider = req.body.rider;
    const driver = req.body.driver;
    const departure = req.body.from;
    const destination = req.body.destination;
    const trip_distance = req.body.trip_distance;
    const trip_status = "pending";

    const driverId = req.driverId;
    const riderId = req.rider;

    const newTrip = new TripModel(null, driverId, riderId, departure, destination, trip_distance, trip_status);
    newTrip.newTrip().then((result) => {
        if(result.rows.length > 0){
            res.status(201).json({
                message: 'Trip created',
                rest_trip: result.rows,
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

exports.completeTrip = (req, res, next) =>{
    const id = req.params.id;
    const newPath = path.join(p, 'invoices', 'invoices.json')

    const characters = /[a-zA-Z!@#\$%\^\&*\)\(+=._-]/;
    if(id.match(characters) || id === ''){
        return res.status(403).json({
            message: 'Unauthorized characters'
        })
    }

    const complete = new TripModel(id, null, null, null, null, null, 'complete');

    const cost = calCulateCharges(id)
    complete.completeTrip().then((result) => {
        if(result.rows.length > 0){
            fs.writeFileSync(newPath, JSON.stringify(result.rows));
            return res.status(200).json({
                message: 'Trip complete',
                trip: result.rows,
                trip_cost: cost
            })
        }else{
            res.status(404).json({
                message: 'Trip not found'
            })
        }
    }).catch((error) => res.send(error))
}

exports.activateTrip = (req, res, next) => {
    const {tripId} = req.params;
    const {driverId} = req.params;

    const letters = /[A-Za-z!@#\$%\^\&*\)\(+=._-]/;

    if(tripId === '' || tripId.match(letters)){
        return res.status(403).json({
            message: 'Invalid trip ID'
        })
    }

    if(driverId === '' || driverId.match(letters)){
        return res.status(403).json({
            message: 'Invalid driver ID'
        })
    }

    const activate = new TripModel(tripId, driverId, null, null, null, null, 'active');
    activate.activateTip().then((result) => {
        if(result.rows.length > 0){
            res.status(200).json({
                message: 'Trip activated',
                trip: result.rows
            })
        }else{
            res.status(404).json({
                message: 'No trip found'
            })
        }
    }).catch((error) => res.send(error))
}

exports.activeTrips = (req, res, next) => {
    const active = new TripModel(null, null, null, null, null, null, 'active');
    active.getActiveTrips().then((result) => {
        if(result.rows.length > 0){
            res.status(200).json({
                message: 'Active trips',
                trips: result.rows
            })
        }else{
            res.status(200).json({
                message: 'Not active trips',
            })
        }
    }).catch((error) => res.send(error))
}