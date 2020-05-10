const chai = require('chai');
const chaiHttp = require('chai-http');
const index = require('../index');

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