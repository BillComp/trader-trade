'use strict'

let gulp = global.gulp = require( 'gulp' )
global.plugins = require('gulp-load-plugins')( { scope: ['devDependencies'] } )
global.argv = require('minimist')(process.argv.slice(2))

require( './gulp/server' )

gulp.task( 'build', gulp.parallel(
	'build-server'
) )

gulp.task( 'unit', function () {
	return gulp.src( './test/unit/*.mocha.js' ).pipe( global.plugins.mocha({reporter: 'nyan'}) )
} )
gulp.task( 'test', gulp.parallel(
	'unit'
) )

gulp.task('default', gulp.series('build'))
