const mockBackend = require('./mockBackend/server');

const webpackConfig = {
	plugins: [],
	output: {
		publicPath: process.env.BASENAME || '/',
	},
	devServer: {
		setupMiddlewares: (middlewares, devServer) => {
			mockBackend(devServer);
			return middlewares;
		},
		historyApiFallback: {
			index: `${process.env.BASENAME || '/'}index.html`,
		},
	},
};

module.exports = webpackConfig;
