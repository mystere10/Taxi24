const { Pool } = require('pg');
const sqlQueries = require('./sqlqueries');

require('dotenv').config()

const connectionString = process.env.DATABASE_URL;

let db_credentials = {
        host: process.env.DBHOST,
        user: process.env.DBUSERNAME,
        database: process.env.DBNAME,
        port: process.env.DBPORT,
        password: process.env.DBPASSWORD
    };

const pool = connectionString ? new Pool({connectionString}): new Pool(db_credentials);

const connect = () => new Promise(async (resolve, reject) => {
    try {
      pool.connect()
        .then(() => console.log('connected'))
        .catch((error) => console.log(error));
    } catch(error) {
      console.log(error);
    }
  });

const defaultDatabase = async () => {    

    const drivers = [
        [ "kalisa", "kalisa@example.com", "0313232333", true, "kicukiro", "10km", "0", "RAC 4435 BC"],

        [ "desire", "desire@example.com", "0313232456", false, "nyarugenge", "2km", "0", "RA 4333 BB"],
            
        [ "kamulisa", "kamulisa@example.com", "0313237674", false, "musanze", "2km", "0", "RA 4133 BB"],
            
        [ "manu", "manu@example.com", "0234232333", true, "kibuye", "2km", "0", "RA 4334 BB"],

        [ "kamanzi", "kamanzi@example.com", "02342632333", true, "kicukiro", "2km", "0", "RA 4354 BB"],

        [ "kabalisa", "kabalisa@example.com", "02347732333", true, "kicukiro", "2km", "0", "RA 4314 BB"]
    ];

    const riders = [
        [ "doe", "doe@example.com", "kicukiro", "0987232333" ],

        [ "mugabo", "mugabo@example.com", "musanze", "0313230987" ],

        [ "fab", "fab@example.com", "nyarugenge", "0319876333" ],

        [ "johnson", "johson@example.com", "kibuye", "0367852333"],

        [ "john", "john@example.com", "gasabo", "0378762333"]
    ];

    const driversTable = `CREATE TABLE IF NOT EXISTS driver(
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        phonenumber VARCHAR(50) UNIQUE NOT NULL,
        available BOOLEAN NOT NULL,
        location VARCHAR(50) NOT NULL,
        distance VARCHAR(15) NOT NULL,
        trip_requests VARCHAR(10) NULL,
        plate_number VARCHAR(50) UNIQUE NOT NULL
    );`;

    const ridersTable = `CREATE TABLE IF NOT EXISTS rider(
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        location VARCHAR(50) NOT NULL,
        phonenumber VARCHAR(50) UNIQUE NOT NULL
    );`;

    const tripTable = `CREATE TABLE IF NOT EXISTS trip(
        id SERIAL PRIMARY KEY,
        driver INTEGER REFERENCES driver(id),
        rider INTEGER REFERENCES rider(id),
        departure VARCHAR(50) NOT NULL,
        destination VARCHAR(50) NOT NULL,
        trip_distance VARCHAR(50) NOT NULL,
        trip_status VARCHAR(25) NOT NULL
    );`;
    
    await pool.query(driversTable);
    await pool.query(ridersTable);
    await pool.query(tripTable);
    // Inserting data for drivers
    await pool.query(sqlQueries.driversDefaultData, drivers[0]);
    await pool.query(sqlQueries.driversDefaultData, drivers[1]);
    await pool.query(sqlQueries.driversDefaultData, drivers[2]);
    await pool.query(sqlQueries.driversDefaultData, drivers[3]);
    await pool.query(sqlQueries.driversDefaultData, drivers[4]);
    await pool.query(sqlQueries.driversDefaultData, drivers[5]);

    // Inserting data for riders
    await pool.query(sqlQueries.ridersDefaultData, riders[0]);
    await pool.query(sqlQueries.ridersDefaultData, riders[1]);
    await pool.query(sqlQueries.ridersDefaultData, riders[2]);
    await pool.query(sqlQueries.ridersDefaultData, riders[3]);
    await pool.query(sqlQueries.ridersDefaultData, riders[4]);
};

if (process.env.NODE_ENV !== 'test'){
    defaultDatabase();
}

const dropTables = async () => {
    const dropAllTables = 'DROP TABLE IF EXISTS driver, rider, trip CASCADE';
    await pool.query(dropAllTables);
}


const db = {
    connect,
    query: (text, params) => pool.query(text, params)
  }

module.exports = db;
