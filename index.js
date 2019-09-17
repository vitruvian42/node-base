const container = require('src/container');

const app = container.resolve('app');
const exceptionNotifier = container.resolve('exceptionNotifier');

app
  .start()
  .catch((error) => {
    app.logger.error(error.stack);
    process.exit();
  });

process
  .on('unhandledRejection', (reason) => {
    exceptionNotifier.exceptionHandler({ error: reason });
  })
  .on('uncaughtException', err => {
    exceptionNotifier.exceptionHandler({ error: err });
  });
