const webpack = require('webpack');
const { getUserConfig } = require('../scripts/utils');

module.exports = {
	output: {
		path: `${process.cwd()}/build`,
	},
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000,
	},
	devServer: {
		port: 4000,
		proxy: {
			'/api': {
				target: getUserConfig(['webpack', 'api-url']) || 'http://localhost',
				changeOrigin: true,
				secure: false,
			},
		},
		historyApiFallback: true,
	},
	devtool: 'inline-source-map',
	plugins: [
		new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') }),
	],
};
