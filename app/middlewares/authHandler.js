'use strict';

function authHandler() {
  return async (ctx, next) => {
    // Respond 401 for unauthorized request
    if (ctx.request.headers['authorization'] !== process.env.AUTH_KEY &&
      ctx.request.headers['authorization'] !== process.env.ADMIN_AUTH_KEY) {
      ctx.res.unauthorized('consumer_unauthorized', 'Consumer Authorization key is required', {});
      return;
    }
    if (ctx.request.method !== 'HEAD' &&
      ctx.request.method !== 'GET' &&
      ctx.request.headers['authorization'] !== process.env.ADMIN_AUTH_KEY) {
      ctx.res.unauthorized('producer_unauthorized', 'Producer Authorization key is required', {});
      return;
    }
    return await next();
  };
}

module.exports = authHandler;
