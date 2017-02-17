const config = require('./webpack.config.js');
const webpack = require('webpack');
const ENV = require('./env');

config.output.path = `${__dirname}/dist`;
config.plugins.push(new webpack.optimize.UglifyJsPlugin({
	compress: {
		warnings: false,
	},
	comments: false,
	mangle: true,
	minimize: true,
}));
config.plugins.push(new webpack.DefinePlugin({
	'process.env.NODE_ENV': JSON.stringify(ENV.PROD),
}));

module.exports = config;
