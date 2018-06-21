const getCommonWebpackConfig = require('./config/webpack.config');
const getDevWebpackConfig = require('./config/webpack.config.dev');
const getProdWebpackConfig = require('./config/webpack.config.prod');

module.exports = function getWebpackConfiguration(presetApi) {
	const webpackConfigurations = [getCommonWebpackConfig(presetApi)];

	if (presetApi.mode === 'development') {
		webpackConfigurations.push(getDevWebpackConfig(presetApi));
	} else if (presetApi.mode === 'production') {
		webpackConfigurations.push(getProdWebpackConfig(presetApi));
	}

	return webpackConfigurations;
};
