const sqlQueries = {}

const driversDefaultData = 'INSERT INTO driver(username, email, phonenumber, available, location, distance, trip_requests, plate_number)values($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT DO NOTHING';
const ridersDefaultData = 'INSERT INTO rider(username, email, location, phonenumber)VALUES($1,$2,$3,$4) ON CONFLICT DO NOTHING';
const getAllDrivers = 'SELECT * FROM driver';

sqlQueries.driversDefaultData = driversDefaultData;
sqlQueries.ridersDefaultData = ridersDefaultData;
sqlQueries.getAllDrivers = getAllDrivers;

module.exports = sqlQueries;
