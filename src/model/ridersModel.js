const db = require('./db/connect');
const sqlQueries = require('./db/sqlqueries');

class Rider{
    constructor(id, username, email, location, phonenumber){
        this.id = id;
        this.username = username;
        this.email = email;
        this.location = location;
        this.phonenumber = phonenumber;
    }

    getOneRider(){
        return db.query(sqlQueries.getOneRider, [this.id]);
    }

    static getAllRider(){
        return db.query(sqlQueries.getRiders)
    }
}

module.exports = Rider;