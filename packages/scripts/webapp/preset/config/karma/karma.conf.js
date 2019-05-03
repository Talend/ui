const path = require('path');
const argv = require('yargs').argv;
const webpackConfig = require('./webpack.config');

module.exports = function(config) {
	const specBundle = path.join(process.cwd(), 'spec.bundle.js');
	config.set({
		// base path used to resolve all patterns
		basePath: '',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],

		client: {
			jasmine: {
				random: false,
			},
		},

		// list of files/patterns to load in the browser
		files: [specBundle],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			[specBundle]: ['webpack'],
		},

		webpack: webpackConfig,

		webpackServer: {
			noInfo: true, // prevent console spamming when running in Karma!
		},

		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['jasmine-diff', 'progress'],

		// web server port
		port: 9876,

		// enable colors in the output
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_WARN,

		// toggle whether to watch files and rerun tests upon incurring changes
		autoWatch: !!argv.auto,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['PhantomJS'],

		// if true, Karma runs tests once and exits
		singleRun: !argv.auto,

		proxies: {
			'/assets/': '/src/assets/',
		},

		browserNoActivityTimeout: 120000,
	});
};
