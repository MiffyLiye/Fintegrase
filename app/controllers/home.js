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
  let offset = Math.round(parseFloat(ctx.query.offset || 0));
  if (offset < 0) {
    offset = 0;
  }
  let limit = Math.round(parseFloat(ctx.query.limit || 10));
  if (limit > 100) {
    limit = 100;
  }
  const data = await ctx.mongo.db('test').collection(ctx.params.category)
    .find()
    .skip(offset)
    .limit(limit)
    .toArray();
  ctx.body = {
    offset,
    limit,
    data
  };
};

exports.createEntry = async ctx => {
  const data = await ctx.mongo.db('test').collection(ctx.params.category)
    .insert(ctx.request.body);
  ctx.status = 201;
  ctx.body = data.result;
};

exports.deleteEntries = async ctx => {
  await ctx.mongo.db('test').collection(ctx.params.category).remove();
  ctx.status = 202;
  ctx.body = {};
};

exports.showSwaggerSpec = ctx => {
  ctx.body = spec;
};
