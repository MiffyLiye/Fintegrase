'use strict';

const supertest = require('supertest');
const app = require('../../app');


describe('Entries', () => {
  const request = supertest(app.listen());

  describe('GET /categories/:category/entries', () => {
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

  describe('POST /categories/:category/entries', () => {
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

  describe('DELETE /categories/:category/entries', () => {
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

  describe('DELETE /categories/:category/entries/:id', () => {
    it('<200> delete article in database', async () => {
      await request
        .delete('/categories/articles/entries');

      await request
        .post('/categories/articles/entries')
        .send({ name: 'tao' });

      const beforeRes = await request
        .get('/categories/articles/entries');

      await request
        .delete(`/categories/articles/entries/${beforeRes.body.data[0]._id}`)
        .expect('Content-Type', /json/)
        .expect(200);

      const afterRes = await request
        .get('/categories/articles/entries');
      expect(afterRes.body.data.length).toBe(0);
    });
  });
});
