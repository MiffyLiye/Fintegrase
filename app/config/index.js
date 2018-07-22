'use strict';

const dotenv = require('dotenv');


// Load environment variables from .env file
dotenv.config();

const env = process.env.NODE_ENV || 'development';
const configs = {
  base: {
    env,
    consumerAuthKey: process.env.AUTH_KEY || 'consumer_auth_key',
    adminAuthKey: process.env.ADMIN_AUTH_KEY || 'admin_auth_key',
    name: process.env.APP_NAME || 'fintegrase',
    host: process.env.APP_HOST || '127.0.0.1',
    port: 7070
  },
  production: {
    port: process.env.APP_PORT || 7071
  },
  development: {
  },
  test: {
    port: 7072,
  }
};
const config = Object.assign(configs.base, configs[env]);

module.exports = config;
