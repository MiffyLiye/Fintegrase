'use strict';

function authHandler() {
  return async (ctx, next) => {
    // Respond 401 for unauthorized request
    if (ctx.request.headers['authorization'] !== process.env.AUTH_KEY &&
      ctx.request.headers['authorization'] !== process.env.ADMIN_AUTH_KEY) {
      ctx.res.unauthorized(401, 'Unauthorized', {});
      return;
    }
    if (ctx.request.method !== 'HEAD' &&
      ctx.request.method !== 'GET' &&
      ctx.request.headers['authorization'] !== process.env.ADMIN_AUTH_KEY) {
      ctx.res.unauthorized(401, 'Unauthorized', {});
      return;
    }
    return await next();
  };
}

module.exports = authHandler;
