const chai = require('chai');
const chaiHttp = require('chai-http');
const index = require('../index');
const db = require('../src/model/db/connect');
const sqlQueries = require('../src/model/db/sqlqueries')
const mockData = require('./mockData');

require('dotenv').config()

const should = chai.should();

chai.use(chaiHttp);

let driverId;
let tripId;

describe('Tests for trip creation', () => {
    const trip = {
        driver: "Desire",
        rider: "doe",
        from: "kicukiro",
        destination: "musanze",
        trip_distance: "90km",
        trip_status: "pending"
    }
    it('should create a new trip', (done) => {
        chai.request(index)
            .post('/api/v1/trip/new')
            .send(trip)
            .end((err, res) => {
                driverId = res.body.rest_trip[0].driver;
                tripId = res.body.rest_trip[0].id;
                res.should.have.status(201);
                res.body.should.have.property('message').eql('Trip created')
                done();
            })
    });

    it('should complete a trip', (done) => {
        chai.request(index)
            .patch(`/api/v1/trip/${tripId}/complete`)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });

    it('should activate a trip', (done) => {
        chai.request(index)
            .patch(`/api/v1/trip/1/${driverId}/activate`)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });

    it('should list all active trips', (done) => {
        chai.request(index)
            .get('/api/v1/trip/active')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });
});


