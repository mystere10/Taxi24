const chai = require('chai');
const chaiHttp = require('chai-http');
const index = require('../index');

require('dotenv').config()

const should = chai.should();

chai.use(chaiHttp);

it('should get the homepage', (done) => {
    chai.request(index).get('/').end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('Welcome to taxi24');
        done();
    });
});

it('should return an error if the route doesn\'t exist', (done) => {
    chai.request(index).get('/unknown').end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('Endpoint not found');
        done();
    })
})