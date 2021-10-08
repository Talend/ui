const mockBackend = require('./mockBackend/server');
const config = require('./webpack.config');

const webpackConfig = {
	...config,
	devServer: {
		before: mockBackend,
	},
	resolve: {
		symlinks: false,
	},
};

module.exports = webpackConfig;
