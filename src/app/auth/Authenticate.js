const Operation = require('src/app/Operation');
const CustomError = require('src/infra/custom-error');
const axios = require('axios');

class Authenticate extends Operation {
  constructor({ database, config }){
    super();
    this.database = database;
    this.config = config;
  }

  execute(headers){
    const { ERROR, UNAUTHORIZED } = this.outputs;
    this.emit(UNAUTHORIZED);
  }

}

Authenticate.setOutputs(['SUCCESS', 'ERROR', 'UNAUTHORIZED']);

module.exports = Authenticate;
