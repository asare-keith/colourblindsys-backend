import request from 'supertest';
import App from '../App';
import { expect as _expect } from 'chai';
const expect = _expect;

describe('GET /sales', () => {
  it('responds with status 200', (done) => {
    request(app)
      .get('/sales')
      .expect(200, done);
  });

  it('responds with JSON', (done) => {
    request(app)
      .get('/sales')
      .expect('Content-Type', /json/, done);
  });

  it('returns an array of sales data', (done) => {
    request(app)
      .get('/sales')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });
});