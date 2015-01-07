require('../../../server');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

describe('frontpage routes', function() {

  it('should be able to get frontpage items', function(done) {
    chai.request('http://localhost:3000')
      .get('/api/public/frontpage')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(Array.isArray(res.body)).to.be.true;
        expect(res.body[0]).to.have.property('title');
        expect(res.body[0]).to.have.property('content');
        done();
      });
    });

});
