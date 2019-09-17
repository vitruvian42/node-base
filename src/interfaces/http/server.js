const express = require('express')

class Server {
    constructor ({ config, logger, router, redisClient }) {
        this.config = config
				this.logger = logger
				this.redisClient = redisClient

        this.express = express()
        this.express.disable('x-powered-by')
        this.express.use(router)
    }

    start () {
			const app = this.express;
			const httpServer = require('http').createServer(app);
			const server =  httpServer.listen(this.config.app.port, () => {
				const { port } = server.address();
				this.logger.info(`[p ${process.pid}] Listening at port ${port}`);
			});
    }
}

module.exports = Server