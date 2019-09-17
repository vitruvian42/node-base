class ExceptionNotifier {
  constructor({ backgroundProcess, config }) {
    this.backgroundProcess = backgroundProcess;
    this.config = config;
  }

  exceptionHandler (debugParams) {
    const error = debugParams.error;
    const config = this.config;

    var mailOptions = {
      from: config.mailers.supportEmail,
      to: config && config.mailers && config.mailers.exceptionAlerts ? config.mailers.exceptionAlerts : 'blueshift-dev@quantinsti.com',
      subject: '[' + (process.env.NODE_ENV || 'development') + '][Exception in backend live] '
    };
    mailOptions.subject += error.message;

    var emailText = '';

    if (debugParams.details) {
      emailText += '<b>Information: </b>' + '<br>';
      emailText += JSON.stringify(debugParams.details);
      emailText += '<br><br>';
    }

    if (debugParams.req) {
      emailText += '<b>Request</b>' + '<br>';
      emailText += JSON.stringify(debugParams.req.headers);
      emailText += '<br><br>';

      emailText += '<b>Route</b>' + '<br>';
      emailText += JSON.stringify(debugParams.req.originalUrl);
      emailText += '<br><br>';
    }

    emailText += '<b>StackTrace</b>' + '<br>';
    if (typeof (error.stack) === 'object') {
      emailText += JSON.stringify(error.stack);
    } else if (typeof (error.stack) === 'string') {
      emailText += error.stack.replace(/\n/g, '<br>');
    } else {
      emailText += error.stack;
    }
    mailOptions.html = emailText;
    return this.backgroundProcess.saveEmailQueue(mailOptions);
  }
}
module.exports = ExceptionNotifier;
