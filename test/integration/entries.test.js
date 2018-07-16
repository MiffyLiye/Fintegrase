'use strict';

const supertest = require('supertest');
const app = require('../../app');
const adminAuthKey = 'admin_auth_key';

describe('Entries', () => {
  const request = supertest(app.listen());

  describe('GET /categories/:category/entries', () => {
    it('<200> get articles from database', async () => {
      await request
        .delete('/categories/articles/entries')
        .set('Authorization', adminAuthKey);

      await request
        .post('/categories/articles/entries')
        .set('Authorization', adminAuthKey)
        .send({name: 'tao'});

      await request
        .post('/categories/articles/entries')
        .set('Authorization', adminAuthKey)
        .send({name: 'miffy'});

      const res = await request
        .get('/categories/articles/entries')
        .set('Authorization', adminAuthKey)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.data.length).toBe(2);

      const resWithLimit = await request
        .get('/categories/articles/entries?limit=1')
        .set('Authorization', adminAuthKey)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(resWithLimit.body.data.length).toBe(1);

      const resWithOffsetLimit = await request
        .get('/categories/articles/entries?offset=1&limit=2')
        .set('Authorization', adminAuthKey)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(resWithOffsetLimit.body.data.length).toBe(1);

      const resWithMoreOffset = await request
        .get('/categories/articles/entries?offset=2')
        .set('Authorization', adminAuthKey)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(resWithMoreOffset.body.data.length).toBe(0);
    });

    it('<200> query articles by uri', async () => {
      await request
        .delete('/categories/articles/entries')
        .set('Authorization', adminAuthKey);

      await request
        .post('/categories/articles/entries')
        .set('Authorization', adminAuthKey)
        .send({uri: 'https://fintegrase.miffyliye.org/'});

      await request
        .post('/categories/articles/entries')
        .set('Authorization', adminAuthKey)
        .send({uri: 'https://fintegrase.miffyliye.com/'});

      const res = await request
        .get(`/categories/articles/entries?query=${encodeURIComponent(JSON.stringify({uri: 'https://fintegrase.miffyliye.org/'}))}`)
        .set('Authorization', adminAuthKey)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].uri).toBe('https://fintegrase.miffyliye.org/');
      expect(res.body.query.uri).toBe('https://fintegrase.miffyliye.org/');
    });

    it('<401> get articles without auth key', async () => {
      const res = await request
        .get('/categories/articles/entries')
        .expect('Content-Type', /json/)
        .expect(401);
      expect(res.body.code).toBe('consumer_unauthorized');
      expect(res.body.message).toBe('Consumer Authorization key is required');
    });
  });

  describe('POST /categories/:category/entries', () => {
    it('<201> insert user to database', async () => {
      await request
        .delete('/categories/articles/entries')
        .set('Authorization', adminAuthKey);

      await request
        .post('/categories/articles/entries')
        .set('Authorization', adminAuthKey)
        .send({name: 'tao'})
        .expect('Content-Type', /json/)
        .expect(201);

      const res = await request
        .get('/categories/articles/entries')
        .set('Authorization', adminAuthKey)
        .expect('Content-Type', /json/)
        .expect(200);
      const articles = res.body.data;
      expect(articles.length).toBe(1);
      expect(articles[0].name).toBe('tao');
    });

    it('<401> insert user without auth key', async () => {
      const res = await request
        .post('/categories/articles/entries')
        .send({name: 'tao'})
        .expect('Content-Type', /json/)
        .expect(401);
      expect(res.body.code).toBe('producer_unauthorized');
      expect(res.body.message).toBe('Producer Authorization key is required');
    });
  });

  describe('DELETE /categories/:category/entries', () => {
    it('<202> delete articles in database', async () => {
      await request
        .post('/categories/articles/entries')
        .set('Authorization', adminAuthKey)
        .send({name: 'tao'});

      await request
        .delete('/categories/articles/entries')
        .set('Authorization', adminAuthKey)
        .expect(202);

      const res = await request
        .get('/categories/articles/entries')
        .set('Authorization', adminAuthKey)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.data.length).toBe(0);
    });
  });

  describe('DELETE /categories/:category/entries/:id', () => {
    it('<200> delete article in database', async () => {
      await request
        .delete('/categories/articles/entries')
        .set('Authorization', adminAuthKey);

      await request
        .post('/categories/articles/entries')
        .set('Authorization', adminAuthKey)
        .send({name: 'tao'});

      const beforeRes = await request
        .get('/categories/articles/entries')
        .set('Authorization', adminAuthKey);

      await request
        .delete(`/categories/articles/entries/${beforeRes.body.data[0]._id}`)
        .set('Authorization', adminAuthKey)
        .expect('Content-Type', /json/)
        .expect(200);

      const afterRes = await request
        .get('/categories/articles/entries')
        .set('Authorization', adminAuthKey);
      expect(afterRes.body.data.length).toBe(0);
    });
  });
});
