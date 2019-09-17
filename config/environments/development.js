const path = require('path');
const logPath = path.join(__dirname, '../../logs/development.log');
require('dotenv').config();

module.exports = {
  app:{
    port: process.env.PORT,
    selfApiURL: process.env.SELF_URL + '/api/',
    callbackURL: process.env.SELF_URL + '/api/execution/callback/'
  },
  auth: {
    ttl: 365 * 24 * 60 * 60
  },
  logging: {
    appenders: {
      out: { type: 'console' },
      task: { type: 'file', filename: logPath }
    },
    categories: {
      default: { appenders: [ 'out' ], level: 'info' },
      task: { appenders: [ 'task' ], level: 'info' }
    }
  },
  mailerServiceRedisConf: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    auth: process.env.REDIS_AUTH
  },
  mailers: {
    exceptionAlerts: 'nikhil.j@quantinsti.com',
    supportEmail: 'nikhil.j@quantinsti.com'
  },
  database: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    define: {
      timestamps: false
    },
    benchmark: true,
    logging: null
  },
  redisConfig: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  },
  AUTH_SERVER_URL: process.env.AUTH_SERVER_URL
};
