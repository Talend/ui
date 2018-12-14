const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = ({ getUserConfig }) => {
	const plugins = [];
	if (getUserConfig('cmf') !== false) {
		// eslint-disable-next-line global-require,import/newline-after-import
		const ReactCMFWebpackPlugin = require('@talend/react-cmf-webpack-plugin');
		plugins.push(new ReactCMFWebpackPlugin({ quiet: true }));
	}

	return {
		mode: 'production',
		optimization: {
			/**
			 * Let’s create a vendor chunk which contain all code from
			 * node_modules imported in the project.
			 * Whenever, Webpack encounters import statement of npm module,
			 * it will push that code inside vendor chunk.
			 */
			splitChunks: {
				cacheGroups: {
					default: false,
					vendors: false,
					vendor: {
						chunks: 'all',
						test: /node_modules/,
					},
				},
			},
			minimizer: [
				new UglifyJsPlugin({
					cache: true,
					parallel: true,
				}),
				new OptimizeCSSAssetsPlugin({}),
			],
		},
		plugins,
		bail: true,
	};
};
