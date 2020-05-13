const sqlQueries = {}

const driversDefaultData = 'INSERT INTO driver(username, email, phonenumber, available, location, distance, trip_requests, plate_number)values($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT DO NOTHING';
const ridersDefaultData = 'INSERT INTO rider(username, email, location, phonenumber)VALUES($1,$2,$3,$4) ON CONFLICT DO NOTHING';
const getAllDrivers = 'SELECT * FROM driver';
const getAvailableDrivers = 'SELECT * FROM driver WHERE available=$1';
const driversInDistance = 'SELECT * FROM driver WHERE available=$1 AND location=$2';
const getOneDriver = 'SELECT * FROM driver WHERE id=$1';
const createTrip = 'INSERT INTO trip(driver, rider, departure, destination, trip_distance, trip_status)VALUES($1,$2,$3,$4,$5,$6) RETURNING *';
const getDriverByName = 'SELECT * FROM driver WHERE username=$1';
const getRiderByName = 'SELECT * FROM rider WHERE username=$1';
const completeTrip = 'UPDATE trip SET trip_status=$1 WHERE id=$2 RETURNING *';
const activateTrip = 'UPDATE trip SET trip_status=$1 WHERE driver=$2 AND id=$3 RETURNING *';
const activeTrips = 'SELECT * FROM trip WHERE trip_status=$1';
const getRiders = 'SELECT * FROM rider';

sqlQueries.driversDefaultData = driversDefaultData;
sqlQueries.ridersDefaultData = ridersDefaultData;
sqlQueries.getAllDrivers = getAllDrivers;
sqlQueries.getAvailableDrivers = getAvailableDrivers;
sqlQueries.driversInDistance = driversInDistance;
sqlQueries.getOneDriver = getOneDriver;
sqlQueries.createTrip = createTrip;
sqlQueries.getDriverByName = getDriverByName;
sqlQueries.getRiderByName = getRiderByName;
sqlQueries.completeTrip = completeTrip;
sqlQueries.activateTrip = activateTrip;
sqlQueries.activeTrips = activeTrips;
sqlQueries.getRiders = getRiders;

module.exports = sqlQueries;
