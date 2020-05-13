const TripModel = require('../model/tripModel');
exports.checkDriver = (req, res, next) => {

    const driver = req.body.driver;

    const letters = /[!@#\$%\^\&*\)\(+=._-]/;
    
    if(driver === '' || driver.match(letters)){
        return res.status(403).json({
            messange: 'Unauhorized characters'
        })
    }

    const checkDriver = new TripModel(driver);
    checkDriver.getDriverByName().then((result) => {
        if(result.rows.length > 0){
            req.driverId = result.rows[0].id;
            next();
        }else{
            res.status(404).json({
                status: '404',
                message: 'No driver found make sure the driver exist'
            })
        }  
    }).catch((error) => {
        res.status(500).json({
            message: 'An error occured',
            error: error
        });
    });
}

exports.checkRider = (req, res, next) => {
    const rider = req.body.rider;

    const letters = /[!@#\$%\^\&*\)\(+=._-]/;
    
        if(rider === '' || rider.match(letters)){
            return res.status(403).json({
                messange: 'Unauhorized characters'
            })
        }

    const checkRider = new TripModel(null, rider);
    checkRider.getRiderByName().then((result) => {
        if(result.rows.length > 0){
            req.rider = result.rows[0].id;
            next();
        }else{
            res.status(404).json({
                status: '404',
                message: 'No rider found make sure the rider exist'
            })
        }
    }).catch((error) => {
        res.status(500).json({
            message: 'An error occured',
            error: error
        });
    });
}
