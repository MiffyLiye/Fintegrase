'use strict';

const pkginfo = require('../../package.json');
const spec = require('../spec');


/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Public
 *     summary: Show API information.
 *     operationId: showApiInfo
 *     responses:
 *       200:
 *         description: Describe general API information
 */
exports.welcome = ctx => {
  // BUSINESS LOGIC
  const data = {
    name: pkginfo.name,
    version: pkginfo.version,
    description: pkginfo.description,
    author: pkginfo.author
  };

  ctx.body = data;
};

exports.getEntries = async ctx => {
  const data = await ctx.mongo.db('test').collection(ctx.params.category)
    .find()
    .toArray();
  ctx.body = data;
};

exports.createEntry = async ctx => {
  const data = await ctx.mongo.db('test').collection(ctx.params.category)
    .insert(ctx.request.body);
  ctx.status = 201;
  ctx.body = data.result;
};

exports.showSwaggerSpec = ctx => {
  ctx.body = spec;
};
