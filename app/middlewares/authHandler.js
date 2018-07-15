'use strict';

function authHandler() {
  return async (ctx, next) => {
    // Respond 401 for unauthorized request
    if (ctx.request.headers['authorization'] !== process.env.AUTH_KEY) {
      ctx.res.unauthorized(401, 'Unauthorized', {});
    } else {
      await next();
    }
  };
}

module.exports = authHandler;
