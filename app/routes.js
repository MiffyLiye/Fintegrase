'use strict';

const Router = require('koa-router');
const homeController = require('./controllers/home');


const router = new Router();
router.get('/', homeController.welcome);
router.get('/categories/:category', homeController.getEntries);
router.post('/categories/:category', homeController.createEntry);
router.get('/spec', homeController.showSwaggerSpec);

module.exports = router;
