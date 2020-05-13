const sqlQueries = {}

const driversDefaultData = 'INSERT INTO driver(username, email, phonenumber, available, location, distance, trip_requests, plate_number)values($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT DO NOTHING';
const ridersDefaultData = 'INSERT INTO rider(username, email, location, phonenumber)VALUES($1,$2,$3,$4) ON CONFLICT DO NOTHING';
const getAllDrivers = 'SELECT * FROM driver';
const getAvailableDrivers = 'SELECT * FROM driver WHERE available=$1';
const driversInDistance = 'SELECT * FROM driver WHERE available=$1 AND location=$2';
const getOneDriver = 'SELECT * FROM driver WHERE id=$1';

sqlQueries.driversDefaultData = driversDefaultData;
sqlQueries.ridersDefaultData = ridersDefaultData;
sqlQueries.getAllDrivers = getAllDrivers;
sqlQueries.getAvailableDrivers = getAvailableDrivers;
sqlQueries.driversInDistance = driversInDistance;
sqlQueries.getOneDriver = getOneDriver;

module.exports = sqlQueries;
