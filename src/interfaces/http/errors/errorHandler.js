const Status = require('http-status');
const exceptionNotifier = require('src/infra/exceptionNotifier/ExceptionNotifier');

/* istanbul ignore next */
module.exports = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  const { logger } = req.container.cradle;

  logger.error(err);
  exceptionNotifier.exceptionHandler({ req: req, error: err });

  res.status(Status.INTERNAL_SERVER_ERROR).json({
    type: 'InternalServerError',
    message: 'The server failed to handle this request'
  });
};
