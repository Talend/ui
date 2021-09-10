const mockBackend = require('./mockBackend/server');
const config = require('./webpack.config');

const webpackConfig = {
	...config,
	devServer: {
		before: mockBackend,
	},
};

module.exports = webpackConfig;
