'use strict';

const Router = require('koa-router');
const homeController = require('./controllers/home');
const entriesController = require('./controllers/entries');


const router = new Router();
router.get('/', homeController.welcome);
router.get('/categories/:category/entries', entriesController.getEntries);
router.post('/categories/:category/entries', entriesController.createEntry);
router.delete('/categories/:category/entries', entriesController.deleteEntries);
router.delete('/categories/:category/entries/:id', entriesController.deleteEntry);
router.get('/spec', homeController.showSwaggerSpec);

module.exports = router;
