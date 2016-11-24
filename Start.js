'use strict'

let argv = require('yargs').argv

let Fuser = require('floca')
let FuserAMQP = require('floca-amqp')
let fuserAMQP = new FuserAMQP()

let Assigner = require('assign.js')
let assigner = new Assigner()

if (argv.env === 'dev')
	process.argv.development = true
let env = argv.env ? ('.' + argv.env) : ''

let fuser = new Fuser( assigner.assign( {
	channeller: fuserAMQP
}, require( './floca.config' + env ) ) )

fuser.start( function () {
	console.log('Started.')
} )
