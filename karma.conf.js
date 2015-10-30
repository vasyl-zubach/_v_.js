// Karma configuration
// Generated on Thu Oct 22 2015 13:34:22 GMT+0300 (EEST)

var isparta = require( 'isparta' );

module.exports = function ( config ) {
	config.set( {

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['requirejs', 'mocha', 'chai'],

		// list of files / patterns to load in the browser
		files: [
			//'node_modules/karma-babel-preprocessor/node_modules/babel-core/browser-polyfill.js',
			{pattern: 'src/*.js', included: false},
			{pattern: 'dist/*.js', included: false},
			{pattern: 'test/**/*.spec.js', included: false},
			'test/test-main.js'
		],


		// list of files to exclude
		exclude: [],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			//'src/**/*.es6.js': [
			//	'babel',
			//	'sourcemap',
			//	'coverage'
			//],

			'src/**/*.js': [
				//'babel',
				//'sourcemap',
				'coverage'
			]
		},

		babelPreprocessor: {
			options       : {
				sourceMap: 'inline',
				blacklist: ['useStrict']
			},
			sourceFileName: function ( file ) {
				return file.originalPath;
			}
		},


		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: [
			'mocha', // for `browser like` reporting - using lists
			//, 'progress'
			'coverage'
		],


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		//browsers: ['PhantomJS'],
		browsers: [
			'PhantomJS'
			//, 'Chrome'
			//, 'ChromeCanary'
			//, 'Firefox'
			//, 'Opera'
			//, 'Safari'
			//, 'Internet Explorer'
		],


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,

		// Config for coverage reporter
		//coverageReporter: {
		//	type             : 'html',
		//	dir              : 'test/coverage/',
		//	includeAllSources: true
		//},
		coverageReporter: {
			instrumenters: {
				isparta: isparta
			},
			instrumenter : {
				'src/**/*.es6.js': 'isparta'
			},

			reporters: [
				//{
				//	type: 'text-summary',
				//},
				{
					type: 'lcov',
					dir : 'test/coverage/lcov'
				}
			]
		}
	} );
};
