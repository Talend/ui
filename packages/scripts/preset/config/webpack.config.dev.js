const path = require('path');

module.exports = ({ getUserConfig }) => {
	const plugins = [];
	if (getUserConfig('cmf') !== false) {
		// eslint-disable-next-line global-require,import/newline-after-import
		const ReactCMFWebpackPlugin = require('@talend/react-cmf-webpack-plugin');
		plugins.push(new ReactCMFWebpackPlugin({ watch: true }));
	}

	return {
		mode: 'development',
		module: {
			rules: [{
				test:	/.*\.js$/,
				enforce: 'pre',
				loader: 'eslint-loader',
				exclude: /node_modules/,
				options: { configFile: path.resolve(__dirname, '.eslintrc') },
			}],
		},
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000,
		},
		devServer: {
			port: 3000,
			proxy: {
				'/api': {
					target: getUserConfig(['webpack', 'api-url'], 'http://localhost'),
					changeOrigin: true,
					secure: false,
				},
			},
			stats: 'errors-only',
			historyApiFallback: true,
			contentBase: path.join(process.cwd(), '/dist'),
		},
		plugins,
		devtool: 'source-map',
	};
};
