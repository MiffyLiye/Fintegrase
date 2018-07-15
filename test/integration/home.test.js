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

  describe('GET /categories/articles', () => {
    it('<200> get articles from database', async () => {
      await request
        .delete('/categories/articles');

      await request
        .post('/categories/articles')
        .send({ name: 'tao' });

      await request
        .post('/categories/articles')
        .send({ name: 'miffy' });

      const res = await request
        .get('/categories/articles')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.data.length).toBe(2);


      const resWithLimit = await request
        .get('/categories/articles?limit=1')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(resWithLimit.body.data.length).toBe(1);
    });
  });

  describe('POST /categories/articles', () => {
    it('<201> insert user to database', async () => {
      await request
        .delete('/categories/articles');

      await request
        .post('/categories/articles')
        .send({ name: 'tao' })
        .expect('Content-Type', /json/)
        .expect(201);

      const res = await request
        .get('/categories/articles')
        .expect('Content-Type', /json/)
        .expect(200);
      const articles = res.body.data;
      expect(articles.length === 1).toBe(true);
      expect(articles[0].name === 'tao').toBe(true);
    });
  });

  describe('DELETE /categories/articles', () => {
    it('<202> delete articles in database', async () => {
      await request
        .post('/categories/articles')
        .send({ name: 'tao' });

      await request
        .delete('/categories/articles')
        .expect(202);

      const res = await request
        .get('/categories/articles')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.data.length === 0).toBe(true);
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
