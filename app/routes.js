'use strict';

const Router = require('koa-router');
const homeController = require('./controllers/home');


const router = new Router();
router.get('/', homeController.welcome);
router.get('/categories/:category/entries', homeController.getEntries);
router.post('/categories/:category/entries', homeController.createEntry);
router.delete('/categories/:category/entries', homeController.deleteEntries);
router.get('/spec', homeController.showSwaggerSpec);

module.exports = router;
