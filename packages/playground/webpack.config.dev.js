const mockBackend = require('./mockBackend/server');
const config = require('./webpack.config');

const webpackConfig = {
	...config,
	devServer: {
		onBeforeSetupMiddleware: mockBackend,
	},
};

module.exports = webpackConfig;
