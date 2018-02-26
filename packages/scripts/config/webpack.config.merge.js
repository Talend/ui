const merge = require('lodash.merge')
const defaultConfig = require('./webpack.config');

function getDevConfig() {
	const pureDevConfig = {
		output: {
			path: `${process.cwd()}/build`,
		},
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000,
		},
		devServer: {
			port: 3000,
			proxy: {
				'/api': {
					target: process.env.API_URL || 'http://localhost',
					changeOrigin: true,
					secure: false,
				},
			},
			historyApiFallback: true,
		},
	};
	return merge({}, defaultConfig, pureDevConfig);
}

let mergedConfig = (process.env.TALEND_MODE === 'development') ? getDevConfig() : defaultConfig;
const appConfigPath = process.env.TALEND_APP_CONFIG;
if (appConfigPath) {
	console.log(`Merge ${process.env.TALEND_MODE} webpack config with app custom one (${appConfigPath})`);
	const appConfig = require(appConfigPath);
	mergedConfig = merge(mergedConfig, appConfig);
}
module.exports = mergedConfig;
