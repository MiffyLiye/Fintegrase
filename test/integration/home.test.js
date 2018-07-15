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

  describe('GET /categories/articles/entries', () => {
    it('<200> get articles from database', async () => {
      await request
        .delete('/categories/articles/entries');

      await request
        .post('/categories/articles/entries')
        .send({ name: 'tao' });

      await request
        .post('/categories/articles/entries')
        .send({ name: 'miffy' });

      const res = await request
        .get('/categories/articles/entries')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.data.length).toBe(2);

      const resWithLimit = await request
        .get('/categories/articles/entries?limit=1')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(resWithLimit.body.data.length).toBe(1);

      const resWithOffsetLimit = await request
        .get('/categories/articles/entries?offset=1&limit=2')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(resWithOffsetLimit.body.data.length).toBe(1);

      const resWithMoreOffset = await request
        .get('/categories/articles/entries?offset=2')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(resWithMoreOffset.body.data.length).toBe(0);
    });
  });

  describe('POST /categories/articles/entries', () => {
    it('<201> insert user to database', async () => {
      await request
        .delete('/categories/articles/entries');

      await request
        .post('/categories/articles/entries')
        .send({ name: 'tao' })
        .expect('Content-Type', /json/)
        .expect(201);

      const res = await request
        .get('/categories/articles/entries')
        .expect('Content-Type', /json/)
        .expect(200);
      const articles = res.body.data;
      expect(articles.length).toBe(1);
      expect(articles[0].name).toBe('tao');
    });
  });

  describe('DELETE /categories/articles/entries', () => {
    it('<202> delete articles in database', async () => {
      await request
        .post('/categories/articles/entries')
        .send({ name: 'tao' });

      await request
        .delete('/categories/articles/entries')
        .expect(202);

      const res = await request
        .get('/categories/articles/entries')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.data.length).toBe(0);
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
