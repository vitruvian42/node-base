class Application {
  constructor({ server, database, logger }) {
    this.server = server;
    this.database = database;
    this.logger = logger;
  }

  async start() {
    if(this.database) {
      await this.database.authenticate();
    }

    await this.server.start();
  }
}

module.exports = Application;
