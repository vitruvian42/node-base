const { createContainer, asClass, asFunction, asValue } = require('awilix')
const { scopePerRequest } = require('awilix-express')
const redis = require("redis")

const Config = require('../config')
const Application = require('./app/Application')

//Email service
const MailQueue = require('src/infra/exceptionNotifier/MailQueue')
const BackgroundProcess = require('src/infra/exceptionNotifier/backgroundProcess')
const ExceptionNotifier = require('src/infra/exceptionNotifier/ExceptionNotifier')


const errorHandler = require('./interfaces/http/errors/errorHandler');
const devErrorHandler = require('./interfaces/http/errors/devErrorHandler');
const swaggerMiddleware = require('./interfaces/http/swagger/swaggerMiddleware');


const {
	database
} = require('./infra/database/models');


const {
	Authenticate
} = require('./app/auth');

const Server = require('./interfaces/http/server')
const Router = require('./interfaces/http/router')
const Logger = require('./infra/logging/logger')
const LoggerMiddleware = require('./interfaces/http/logging/loggerMiddleware')

const container = createContainer()

// System
container
.register({
	app: asClass(Application).singleton(),
	server: asClass(Server).singleton(),
	redisClient: asValue(redis.createClient())
})
.register({
	router: asFunction(Router).singleton(),
	logger: asFunction(Logger).singleton()
})
.register({
	config: asValue(Config)
})


// Database
container.register({
	database: asValue(database)
});

// Middlewares
container
.register({
	loggerMiddleware: asFunction(LoggerMiddleware).singleton()
})
.register({
	containerMiddleware: asValue(scopePerRequest(container)),
	errorHandler: asValue(Config.production ? errorHandler : devErrorHandler),
	swaggerMiddleware: asValue([swaggerMiddleware])
})
	
// Operations
container.register({
  authenticate: asClass(Authenticate)
});

// Email service
container.register({
  mailQueue: asClass(MailQueue).singleton(),
  backgroundProcess: asFunction(BackgroundProcess),
  exceptionNotifier: asClass(ExceptionNotifier)
})

module.exports = container