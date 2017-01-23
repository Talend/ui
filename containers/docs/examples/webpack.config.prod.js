const config = require('./webpack.config.js');
const webpack = require('webpack');

config.output.path = `${__dirname}/dist`;
delete config.devtool;
config.plugins.push(new webpack.optimize.UglifyJsPlugin({
	compress: {
		warnings: false,
	},
	comments: false,
	mangle: true,
	minimize: true,
}));
config.plugins.push(new webpack.DefinePlugin({
	'process.env.NODE_ENV': JSON.stringify('production'),
}));

module.exports = config;
