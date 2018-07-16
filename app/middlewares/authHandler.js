'use strict';

const consumerAuthKey = process.env.AUTH_KEY || 'consumer_auth_key';
const adminAuthKey = process.env.ADMIN_AUTH_KEY || 'admin_auth_key';

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
