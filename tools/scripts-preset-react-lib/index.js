const getBabelConfigurationPath = require('@talend/scripts-config-babel');
const getEslintConfigurationPath = require('@talend/scripts-config-eslint');
const getStylelintConfigurationPath = require('@talend/scripts-config-stylelint');
const getJestConfigurationPath = require('@talend/scripts-config-jest');
const getTypescriptConfigurationPath = require('@talend/scripts-config-typescript');
const getWebpackConfiguration = require('@talend/scripts-config-react-webpack');
const getStorybookConfigurationPath = require('@talend/scripts-config-storybook-lib');
const cdn = require('@talend/scripts-config-cdn');

module.exports = {
	getEslintConfigurationPath,
	getStylelintConfigurationPath,
	getBabelConfigurationPath,
	getJestConfigurationPath,
	getStorybookConfigurationPath,
	getTypescriptConfigurationPath,
	getWebpackConfiguration: presetApi => getWebpackConfiguration(presetApi, { umd: true }),
	postInstall: cdn.postInstall,
};
