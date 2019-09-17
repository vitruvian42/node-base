require('dotenv').config()

const path = require('path')
const ENV = process.env.NODE_ENV || 'development'

const envConfig = require(path.join(__dirname, 'environments', ENV))

const Config = Object.assign({
    [ENV] : true,
    env: ENV
}, envConfig)

module.exports = Config