'use strict';

const supertest = require('supertest');
const app = require('../../app');


describe('Home', () => {
  const request = supertest(app.listen());

  describe('GET /', () => {
    it('<200> should always return with the API server information', async () => {
      const res = await request
        .get('/')
        .expect('Content-Type', /json/)
        .expect(200);

      const data = res.body;
      const expected = ['name', 'version', 'description', 'author'];
      expect(Object.keys(data)).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('POST /categories/users', () => {
    it('<201> insert user to database', async () => {
      await request
        .post('/categories/users')
        .send({ name: 'tao' })
        .expect('Content-Type', /json/)
        .expect(201);

      const res = await request
        .get('/categories/users')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.length > 0).toBe(true);
    });
  });

  describe('GET /spec', () => {
    it('<200> should always return API specification in swagger format', async () => {
      const res = await request
        .get('/spec')
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
