const mockBackend = require('./mockBackend/server');

const webpackConfig = {
	devServer: {
		before: mockBackend,
	},
};

module.exports = webpackConfig;
