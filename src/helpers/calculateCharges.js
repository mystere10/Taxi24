const TripModel = require('../model/tripModel');

module.exports = calCulateCharges = (id) => {
    let money = [];
    const trip = new TripModel(id)

    trip.getTrip().then((result) => {
        
        const kilometerCost = 100
        if(result.rows.length > 0){
            result.rows.forEach((trip) => {
                const distance = trip.trip_distance.toString().split('km')[0];
                const kilometers = parseInt(distance)
                money.push(kilometers * kilometerCost + `Rwf`)
             });
        }
    }).catch((err) => console.log(err))
    return money
}
