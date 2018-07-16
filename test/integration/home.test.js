'use strict';

const supertest = require('supertest');
const app = require('../../app');
const consumerAuthKey = 'consumer_auth_key';


describe('Home', () => {
  const request = supertest(app.listen());

  describe('GET /', () => {
    it('<200> should always return with the API server information', async () => {
      const res = await request
        .get('/')
        .set('Authorization', consumerAuthKey)
        .expect('Content-Type', /json/)
        .expect(200);

      const data = res.body;
      const expected = ['name', 'version', 'description', 'author'];
      expect(Object.keys(data)).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('GET /spec', () => {
    it('<200> should always return API specification in swagger format', async () => {
      const res = await request
        .get('/spec')
        .set('Authorization', consumerAuthKey)
        .expect('Content-Type', /json/)
        .expect(200);

      const spec = res.body;
      expect(spec).toHaveProperty('info');
      expect(spec).toHaveProperty('swagger', '2.0');
      expect(spec).toHaveProperty('consumes');
      expect(spec).toHaveProperty('produces');
      expect(spec).toHaveProperty('paths');
    });
  });
});
