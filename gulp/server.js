'use strict'

let gulp = global.gulp

let path = require('path')
let Tail = require('tail').Tail
let logFile = 'forever.log'
let errFile = 'forever.err'


gulp.task('server-lint', function () {
	return gulp.src( ['./bus/**/.js', './util/**/.js'] )
		.pipe( global.plugins.eslint() )
		.pipe( global.plugins.eslint.format() )
		.pipe( global.plugins.eslint.failOnError() )
})

gulp.task('server-coverage', function () {
	return gulp.src( ['./bus/**/*.js'] )
		.pipe( global.plugins.istanbul() )
		.on( 'end', function () {
			gulp.src( ['test/server/*.js'] )
			.pipe( global.plugins.plumber() )
			.pipe( global.plugins.mocha() )
			.pipe( global.plugins.istanbul.writeReports( './docs/coverage/server' ) )
		} )
})

gulp.task( 'build-server', gulp.series(
	'server-lint', 'server-coverage'
) )

let exec = require('child_process').exec
function execute ( operation, callback ) {
	exec('./node_modules/.bin/forever ' + operation + ' -o ' + logFile + ' -e ' + errFile + ' Start.js', function (error, stdout, stderr) {
		console.log('stdout: ' + stdout)
		console.log('stderr: ' + stderr)
		if (error !== null) {
			console.log('exec error: ' + error)
		}
		if ( callback )
			callback( error )
	})
}
function readTail (file) {
	let tail = new Tail( path.join( process.cwd(), file ) )

	tail.on('line', function (data) {
		console.log(data)
	})

	tail.on('error', function (error) {
		console.log('ERROR: ', error)
	})
}
gulp.task( 'run-watch-server', function ( ) {
	execute( 'start', function () {
		readTail( logFile )
		readTail( errFile )
	} )

	let watcher = gulp.watch(['./bus/**/*.js'], gulp.series('server-lint', 'server-coverage', 'test-server') )
	watcher.on('change', function (event) {
		execute( 'restart' )
	})

	let signals = [
		'SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
		'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
	]
	signals.forEach(function (element, index, array) {
		process.on(element, function () {
			execute( 'stop', function () {
				process.exit(1)
			} )
		})
	})
} )

gulp.task( 'watch-server', gulp.series(
	'build-server', 'run-watch-server'
) )
