const Promise = require('bluebird');

module.exports = ({ mailQueue, logger }) => {
  return {
    saveEmailQueue: function (mailOptions) {
      var job = mailQueue.queue.create('Email', mailOptions);

      return new Promise((resolve, reject) => {
        job.priority('high').attempts(5).backoff(true).removeOnComplete(true).ttl(60000).save(function (err) {
          if (err) {
            logger.error('Error in saving email job', mailOptions.to, mailOptions.subject, err);
            reject(err);
          } else {
            logger.info('Successfully created email job', mailOptions.to, mailOptions.subject);
            resolve();
          }
        });
      });
    }
  };
};
