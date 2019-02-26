const CopyWebpackPlugin = require('copy-webpack-plugin');
const mockBackend = require('./mockBackend/server');

const webpackConfig = {
	devServer: {
		before: mockBackend,
	},
	resolve: {
		symlinks: false,
	},
	output: {
		chunkFilename: '[name].chunk.js',
	},
	plugins: [
		new CopyWebpackPlugin([{ from: 'node_modules/brace/theme/chrome.js', to: 'theme-chrome.js' }]),
	],
};

module.exports = webpackConfig;
