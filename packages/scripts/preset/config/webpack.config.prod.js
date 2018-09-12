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
