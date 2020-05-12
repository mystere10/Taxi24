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