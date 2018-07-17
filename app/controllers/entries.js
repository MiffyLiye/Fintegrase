'use strict';
const ObjectId = require('mongodb').ObjectId;

exports.getEntries = async ctx => {
  let offset = Math.round(parseFloat(ctx.query.offset || 0));
  if (offset < 0) {
    offset = 0;
  }
  let limit = Math.round(parseFloat(ctx.query.limit || 10));
  if (limit > 100) {
    limit = 100;
  }
  let query;
  try {
    query = JSON.parse(ctx.query.query || '{}')
  } catch (e) {
    query = {};
  }
  const data = await ctx.mongo.db('test').collection(ctx.params.category)
    .find(query)
    .skip(offset)
    .limit(limit)
    .toArray();
  ctx.body = {
    offset,
    limit,
    query,
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
  const data = await ctx.mongo.db('test').collection(ctx.params.category).deleteOne({_id: new ObjectId(ctx.params.id)});
  ctx.status = 200;
  ctx.body = data.result;
};
