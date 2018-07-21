'use strict';
const config = require('../config');

const consumerAuthKey = config.consumerAuthKey;
const adminAuthKey = config.adminAuthKey;

function authHandler() {
  return async (ctx, next) => {
    // Respond 401 for unauthorized request
    const authKey = ctx.request.headers['authorization'];
    const isAdmin = authKey === adminAuthKey;
    const isConsumer = authKey === consumerAuthKey;

    if (['HEAD', 'GET'].includes(ctx.request.method) && !(isAdmin || isConsumer)) {
      ctx.res.unauthorized('consumer_unauthorized', 'Consumer Authorization key is required', {});
      return;
    }

    if (!['HEAD', 'GET'].includes(ctx.request.method) && !isAdmin) {
      ctx.res.unauthorized('producer_unauthorized', 'Producer Authorization key is required', {});
      return;
    }

    return await next();
  };
}

module.exports = authHandler;
