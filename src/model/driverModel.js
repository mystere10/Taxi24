const db = require('./db/connect');
const sqlQueries = require('./db/sqlqueries');

class Driver{
    constructor(id, username, email, phonenumber, available, location, distance, trip_request, plate_number) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.phonenumber = phonenumber;
        this.available = available;
        this.location = location;
        this.distance = distance;
        this.trip_request = trip_request;
        this.plate_number = plate_number
    }

    static getAllDrivers(){
        return db.query(sqlQueries.getAllDrivers);
    }

    static getAvailableDrivers(){
        return db.query(sqlQueries.getAvailableDrivers, [true]);
    }

    driversInDistance(){
        return db.query(sqlQueries.driversInDistance, [this.available, this.location]);
    }

    getOneDriver(){
        return db.query(sqlQueries.getOneDriver, [this.id])
    }
}

module.exports = Driver;