const getEslintConfigurationPath = require('./preset-talend-eslint');
const getJestConfigurationPath = require('./preset-talend-jest');
const getBabelConfigurationPath = require('./preset-talend-babel');
const getWebpackConfiguration = require('./preset-talend-webpack');

module.exports = {
	getEslintConfigurationPath,
	getJestConfigurationPath,
	getBabelConfigurationPath,
	getWebpackConfiguration,
};
