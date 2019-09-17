const kue = require('kue');

class MailQueue {
  constructor({ config }) {
    this.mailerServiceRedisConf = config.mailerServiceRedisConf;
    this.queue = kue.createQueue({
      redis: {
        port: this.mailerServiceRedisConf.port,
        host: this.mailerServiceRedisConf.host,
        auth: this.mailerServiceRedisConf.auth
      }
    });
  }
}

module.exports = MailQueue;
