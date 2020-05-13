const db = require('./db/connect');
const sqlQueries = require('./db/sqlqueries');

class Trip{
    constructor(driver, rider, departure, destination, trip_distance, trip_status){
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
}
module.exports = Trip;