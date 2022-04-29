const path = require('path');

// eslint-disable-next-line import/no-extraneous-dependencies
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = require('./webpack.config');

module.exports = {
	...config,
	output: {
		...config.output,
		path: path.resolve(__dirname, 'dist'),
		filename: 'TalendIcons.js',
		library: 'TalendIcons',
		libraryTarget: 'umd',
		globalObject: 'this',
	},
	externals: {
		react: 'React',
	},
	plugins: [
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			openAnalyzer: false,
			logLevel: 'error',
		}),
	],
};
