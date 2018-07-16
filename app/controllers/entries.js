'use strict';
const MongoDb = require('mongodb');

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

exports.deleteEntry = async ctx => {
  const data = await ctx.mongo.db('test').collection(ctx.params.category).deleteOne({_id: new MongoDb.ObjectId(ctx.params.id)});
  ctx.status = 200;
  ctx.body = data.result;
};
