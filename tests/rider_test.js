const chai = require('chai');
const chaiHttp = require('chai-http');
const index = require('../index');
const db = require('../src/model/db/connect');
const sqlQueries = require('../src/model/db/sqlqueries')
const mockData = require('./mockData');

require('dotenv').config()

const should = chai.should();

chai.use(chaiHttp);

describe('Riders Tests', () => {
    it('should list all drivers', (done) => {
        chai.request(index).get('/api/v1/riders').end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('List of riders');
            res.body.should.have.property('riders');
            done();
        })
    });

    it('shoult get a specific rider', (done) => {
        chai.request(index).get('/api/v1/riders/1').end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('A rider');
            done();
        })
    });
})
