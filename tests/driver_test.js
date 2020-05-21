const chai = require('chai');
const chaiHttp = require('chai-http');
const index = require('../index');
const db = require('../src/model/db/connect');
const sqlQueries = require('../src/model/db/sqlqueries')
const mockData = require('./mockData');

const should = chai.should();

chai.use(chaiHttp);

require('dotenv').config()

beforeEach('Create drivers', (done) => {
    if(process.env.NODE_ENV === 'test'){
        db.query(sqlQueries.driversDefaultData, mockData.drivers[0]);
        db.query(sqlQueries.driversDefaultData, mockData.drivers[1]);
        db.query(sqlQueries.ridersDefaultData, mockData.riders[0]);
        db.query(sqlQueries.ridersDefaultData, mockData.riders[1]);
        done();
    }
})

describe('Tests for drivers', () => {
    it('should return all drivers in the database', (done) => {
        chai.request(index).get('/api/v1/drivers').end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message');
            done();
        })
    });

    it('should return a single driver', (done) => {
        chai.request(index).get('/api/v1/drivers/1').end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message');
            done();
        })
    });

    it('should return a message if no driver was found', (done) => {
        chai.request(index).get('/api/v1/drivers/100').end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('message');
            done();
        })
    });

    it('should return available drivers', (done) => {
        chai.request(index).get('/api/v1/drivers/available').end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message');
            done();
        })
    });
})

describe('Drivers in a specified location', () => {
    const location = {
        location: 'kicukiro'
    }
    it('should return a driver in a particulat location', (done) => {
        chai.request(index)
            .post('/api/v1/drivers/available/distance')
            .send(location)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').eql('List of available drivers within 3km in the specified location')
            })
        done();
    });
})

describe('Tests for the nearest drivers', () => {
    it('should return the nearest drivers', (done) =>{
        chai.request(index)
            .get('/api/v1/drivers/2/closest')
            .end((err, res) => {
                res.should.have.status(200);
            })
        done();
    })
})

describe('If drivers not founds', () => {
    before('Empty the database', (done) => {
        db.query(sqlQueries.truncateTables);
        done();
    });
    it('it should return 404 if no driver was found', (done) => {
        chai.request(index).get('/api/v1/drivers').end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('message');
            done();
        });
    });
});
