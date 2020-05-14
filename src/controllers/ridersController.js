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

exports.getOneRider = (req, res, next) => {
    const riderId = req.params.id;

    const regex = /[A-Za-z!@#\$%\^\&*\)\(+=._-]/;

    if(riderId.match(regex)){
        return res.status(403).json({
            message: 'Unauthorized characters'
        })
    }
    
    const rider = new RiderModel(riderId);
    rider.getOneRider().then((result) => {
        if(result.rows.length > 0){
            res.status(200).json({
                message: 'A rider',
                rider: result.rows
            })
        }else{
            res.status(404).json({
                message: 'No rider found',
            })
        }
    }).catch((err) => res.send(err))
}