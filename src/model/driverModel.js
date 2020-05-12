const db = require('./db/connect');
const sqlQueries = require('./db/sqlqueries');

class Driver{
    constructor(username, email, phonenumber, available, location, distance, trip_request, plate_number) {
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
}

module.exports = Driver;