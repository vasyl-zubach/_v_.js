var jshintReporter = require( 'jshint-html-reporter' );

module.exports = function ( grunt ) {
	require( 'grunt-task-loader' )( grunt );
	require( 'time-grunt' )( grunt );

	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %>.js | <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			dist   : {
				files: {
					'dist/_v_.min.js': ['src/_v_.js']
				}
			}
		},

		jshint: {
			options: {
				jshintrc      : '.jshintrc',
				reporter      : jshintReporter,
				reporterOutput: 'test/jshint/report.html'
			},
			all    : ['src/**/*.js']
		},

		watch: {
			js: {
				files: ['src/**/*.js'],
				tasks: ['js']
			}
		}
	} );

	grunt.registerTask( 'default', ['js'] );

	grunt.registerTask( 'js', ['uglify', 'jshint'] );
};