'use strict'

let prodConfig = require('./floca.config.dev')

prodConfig.log.level = 'silly'

console.log('Switching to local mode...')

module.exports = prodConfig
