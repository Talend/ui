const config = require('./webpack.config');
const webpack = require('webpack');
const Dashboard = require('webpack-dashboard/plugin');
const ENV = require('./env');

config.devtool = 'eval';
config.plugins.push(new Dashboard());
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
