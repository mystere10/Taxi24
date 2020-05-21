const driverModel = require('../model/driverModel');

exports.getDrivers = (req, res, next) => {
    driverModel.getAllDrivers().then((result) => {
        if(result.rows.length === 0){
            res.status(404).json({
                status: '404',
                message: 'No driver found'
            })
        }else{
            res.status(200).json({
                status: '200',
                message: 'List of drivers',
                drivers: result.rows
            })
        }
    }).catch((error) => {
        res.status(500).json({
            message: 'An error occured',
            error: error
        })
    });
}

exports.getAvailableDrivers = (req, res, next) => {
    driverModel.getAvailableDrivers().then((result) => {
        if(result.rows.length === 0){
            res.status(404).json({
                status: '404',
                message: 'No driver available, try again',
            })
        }else{
            res.status(200).json({
                status: '200',
                message: 'All available drivers',
                divers: result.rows
            })
        }
    }).catch((error) => {
        res.status(500).json({
            message: 'An error occured',
            error: error
        })
    })
}

exports.driversInDistance = (req, res, next) => {
    const location = req.body.location.toLowerCase();
    const characters = /[0-9!@#\$%\^\&*\)\(+=._-]/;
    if(location.match(characters) || location === ''){
        return res.status(400).json({
            message: 'Forbiden use valid location name'
        })
    }
    const locateDriver = new driverModel(null, null, null, null, true, location, null, null, null);
    locateDriver.driversInDistance().then((result) => {
        const drivers = [];
        if(result.rows.length > 0){
            result.rows.forEach((driver) => {
                const distance = driver.distance.toString().split('km')[0];
                if(parseInt(distance) <= 3){
                    drivers.push(driver)
                }
             });
            drivers.length > 0 && (
                res.status(200).json({
                    message: 'List of available drivers within 3km in the specified location',
                    drivers: drivers
                })
            )
        }else{
            res.status(404).json({
               message: 'There is no driver within 3km in the specified location'
           })
       }

    }).catch((error) => {
        res.status(500).json({
            message: 'An error occured',
            error: error
        })
    });
}

exports.getOneDriver = (req, res, next) => {
    const driverId = req.params.id;
    const letters = /[A-Za-z!@#\$%\^\&*\)\(+=._-]/;
    if(driverId === '' || driverId.match(letters)){
        return res.status(400).json({
                message: 'Kindly use a valid user id',
            })
    }
    const driver = new driverModel(driverId);
    driver.getOneDriver().then((result) => {
        if(result.rows.length > 0){
            return res.status(200).json({
                message: 'Driver found',
                driver: result.rows
            })
        }else{
            return res.status(404).json({
                message: 'No driver found',
            })
        }
    }).catch((error) => {
        res.status(500).json({
            message: 'An error occured',
            error: error
        })
    })
}
exports.getClosedDrivers = (req, res, next) => {
    const driverId = req.params.id;

    const regex = /[A-Za-z!@#\$%\^\&*\)\(+=._-]/;
    if(driverId === '' || driverId.match(regex)){
        return res.status(400).json({
            message: 'Kindly use a valid user id',
        })
    }

    const driver = new driverModel(driverId);
    driver.getOneDriver().then((result) => {
        const closestDrivers = [];
        const distance = result.rows[0].distance.toString().split('km')[0]
        driverModel.getAllDrivers().then((results) => {
            results.rows.forEach((driv) => {
                const closestDistance = driv.distance.toString().split('km')[0];
                if(parseInt(closestDistance) <= parseInt(distance)){
                    closestDrivers.push(driv);
                }
            })
            if(result.rows.length > 0){
                return res.status(200).json({
                    driver: result.rows,
                    nearest: closestDrivers
                })
            }
        });
        
    }).catch((error) => res.send(error));
}
