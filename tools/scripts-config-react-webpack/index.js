module.exports = function getWebpackConfiguration(presetApi, option) {
	if (option && option.umd) {
		const getUMDWebpackConfig = require('./config/webpack.config.umd');
		return getUMDWebpackConfig(presetApi);
	}

	const getCommonWebpackConfig = require('./config/webpack.config');
	const getDevWebpackConfig = require('./config/webpack.config.dev');
	const getProdWebpackConfig = require('./config/webpack.config.prod');
	const webpackConfigurations = [getCommonWebpackConfig(presetApi)];

	if (presetApi.mode === 'development') {
		webpackConfigurations.push(getDevWebpackConfig(presetApi));
	} else if (presetApi.mode === 'production') {
		webpackConfigurations.push(getProdWebpackConfig(presetApi));
	}

	return webpackConfigurations;
};
