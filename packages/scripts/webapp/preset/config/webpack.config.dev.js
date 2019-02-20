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
