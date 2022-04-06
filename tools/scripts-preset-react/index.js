const getBabelConfigurationPath = require('@talend/scripts-config-babel');
const getEslintConfigurationPath = require('@talend/scripts-config-eslint');
const getJestConfigurationPath = require('@talend/scripts-config-jest');
const getPrettierConfigurationPath = require('@talend/scripts-config-prettier');
const getStylelintConfigurationPath = require('@talend/scripts-config-stylelint');
const getTypescriptConfigurationPath = require('@talend/scripts-config-typescript');
const getReactWebpackConfiguration = require('@talend/scripts-config-react-webpack');
const getStorybookConfigurationPath = require('@talend/scripts-config-storybook-lib');
const cdn = require('@talend/scripts-config-cdn');

module.exports = {
	getEslintConfigurationPath,
	getBabelConfigurationPath,
	getJestConfigurationPath,
	getPrettierConfigurationPath,
	getStylelintConfigurationPath,
	getStorybookConfigurationPath,
	getTypescriptConfigurationPath,
	getWebpackConfiguration: getReactWebpackConfiguration,
	postInstall: cdn.postInstall,
};
