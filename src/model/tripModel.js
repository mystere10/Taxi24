const db = require('./db/connect');
const sqlQueries = require('./db/sqlqueries');

class Trip{
    constructor(id, driver, rider, departure, destination, trip_distance, trip_status){
        this.id = id;
        this.driver = driver;
        this.rider = rider;
        this.departure = departure;
        this.destination = destination;
        this.trip_distance = trip_distance;
        this.trip_status = trip_status;
    }

    getRiderByName(){
        return db.query(sqlQueries.getRiderByName, [this.rider]);
    }

    getDriverByName(){
        return db.query(sqlQueries.getDriverByName, [this.driver]);
    }

    newTrip(){
        return db.query(sqlQueries.createTrip, [this.driver, this.rider, this.departure, this.destination, this.trip_distance, this.trip_status])
    }

    completeTrip(){
        return db.query(sqlQueries.completeTrip, [this.trip_status, this.id]);
    }

    activateTip(){
        return db.query(sqlQueries.activateTrip, [this.trip_status, this.driver, this.id]);
    }

    getActiveTrips(){
        return db.query(sqlQueries.activeTrips, [this.trip_status]);
    }
}
module.exports = Trip;
