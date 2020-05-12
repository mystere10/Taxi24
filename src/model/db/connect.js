const { Pool } = require('pg');
const format = require('pg-format')
const sqlQueries = require('./sqlqueries');

require('dotenv').config()

let newPool = new Pool({
        host: process.env.DBHOST,
        user: process.env.DBUSERNAME,
        database: process.env.DBNAME,
        port: process.env.DBPORT,
        password: process.env.DBPASSWORD
    });


const connect = async () => await newPool.connect();

const defaultDatabase = async () => {    

    const drivers = [
        [ "Kalisa", "kalisa@example.com", "0313232333", true, "Kicukiro", "10km", "0", "RAC 4435 BC"],
    
        [ "Desire", "desire@example.com", "0313232456", false, "Nyarugenge", "2km", "0", "RA 4333 BB"],
            
        [ "Kamulisa", "kamulisa@example.com", "0313237674", false, "Musanze", "2km", "0", "RA 4133 BB"],
            
        [ "Manu", "manu@example.com", "0234232333", true, "Kibuye", "2km", "0", "RA 4334 BB"]
    ];

    const riders = [
        [ "doe", "doe@example.com", "Kicukiro", "0987232333" ],

        [ "Mugabo", "mugabo@example.com", "Musanze", "0313230987" ],

        [ "Fab", "fab@example.com", "Nyarugenge", "0319876333" ],

        [ "Johnson", "johson@example.com", "Kibuye", "0367852333"],

        [ "John", "john@example.com", "Gasabo", "0378762333"]
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

    const client = await connect();
    
    await client.query(driversTable);
    await client.query(ridersTable);
    await client.query(tripTable);
    // Inserting data for drivers
    await client.query(sqlQueries.driversDefaultData, drivers[0]);
    await client.query(sqlQueries.driversDefaultData, drivers[1]);
    await client.query(sqlQueries.driversDefaultData, drivers[2]);
    await client.query(sqlQueries.driversDefaultData, drivers[3]);

    // Inserting data for riders
    await client.query(sqlQueries.ridersDefaultData, riders[0]);
    await client.query(sqlQueries.ridersDefaultData, riders[1]);
    await client.query(sqlQueries.ridersDefaultData, riders[2]);
    await client.query(sqlQueries.ridersDefaultData, riders[3]);
    await client.query(sqlQueries.ridersDefaultData, riders[4]);
    
};

if (process.env.NODE_ENV !== 'test'){
    defaultDatabase();
}

const dropTables = async () => {
    const client = await connect();
    const dropAllTables = 'DROP TABLE IF EXISTS driver, rider, trip CASCADE';
    await client.query(dropAllTables);
}

const db = {
    connect,
    query: (text, params) => pool.query(text, params),
  }

module.exports = db;
