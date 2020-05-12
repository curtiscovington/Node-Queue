const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');
const HttpStatus = require('../src/http_status');


chai.use(chaiHttp);
chai.should();


describe('POST /jobs', () => {
    it('should respond with a status of 200', done => {
        chai.request(server)
        .post('/jobs')
        .send({url: 'http://test.com'})
        .end((err, res) => {
            res.should.have.status(HttpStatus.Ok);
            done();
        });
    });
    it('should respond with a status of 400 when no url is given', done => {
        chai.request(server)
        .post('/jobs')
        .end((err, res) => {
            res.should.have.status(HttpStatus.BadRequest);
            done();
        });
    });
});
