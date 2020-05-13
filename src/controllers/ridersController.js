const RiderModel = require('../model/ridersModel');

exports.getRiders = (req, res, next) => {
    const riders = RiderModel.getAllRider();
    riders.then((result) => {
        if(result.rows.length > 0){
            res.status(200).json({
                message: 'List of riders',
                riders: result.rows
            });
        }else{
            res.status(404).json({
                message: 'No rider found',
            });
        }
    }).catch((error) => res.send(error))
}