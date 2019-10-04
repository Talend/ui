const mockBackend = require('./mockBackend/server');

const webpackConfig = {
	devServer: {
		before: mockBackend,
	},
	resolve: {
		symlinks: false,
	},
};

module.exports = webpackConfig;
