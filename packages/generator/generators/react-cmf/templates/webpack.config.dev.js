const config = require('./webpack.config');
const webpack = require('webpack');
const ENV = require('./env');

config.devtool = 'inline-source-map';
config.plugins.push(new webpack.DefinePlugin({
	'process.env.NODE_ENV': JSON.stringify(ENV.DEV),
}));

config.watchOptions = {
	aggregateTimeout: 300,
	poll: 1000,
};

config.devServer = {
	proxy: {
		'/api': {
			target: process.env.API_URL || 'http://localhost',
			changeOrigin: true,
			secure: false,
		},
	},
	historyApiFallback: true,
};

module.exports = config;
