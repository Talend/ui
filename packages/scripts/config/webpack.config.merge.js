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

let mergedConfig = (process.env.MODE === 'development') ? getDevConfig() : defaultConfig;
if (process.env.TALEND_APP_CONFIG) {
	const customConfig = require(`${process.cwd()}/${process.env.APP_CONFIG}`);
	mergedConfig = merge(mergedConfig, customConfig);
}

module.exports = mergedConfig;
