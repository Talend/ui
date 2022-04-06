const getBabelConfigurationPath = require('@talend/scripts-config-babel');
const getEslintConfigurationPath = require('@talend/scripts-config-eslint');
const getStylelintConfigurationPath = require('@talend/scripts-config-stylelint');
const getJestConfigurationPath = require('@talend/scripts-config-jest');
const getKarmaConfigurationPath = require('@talend/scripts-config-karma');
const getTypescriptConfigurationPath = require('@talend/scripts-config-typescript');
const getReactWebpackConfiguration = require('@talend/scripts-config-react-webpack');
const getStorybookConfigurationPath = require('@talend/scripts-config-storybook-lib');
const getNgWebpackConfiguration = require('@talend/scripts-config-ng-webpack');
const cdn = require('@talend/scripts-config-cdn');

module.exports = {
	getEslintConfigurationPath,
	getStylelintConfigurationPath,
	getBabelConfigurationPath,
	getJestConfigurationPath,
	getKarmaConfigurationPath,
	getStorybookConfigurationPath,
	getTypescriptConfigurationPath,
	postInstall: cdn.postInstall,
	getWebpackConfiguration(...args) {
		return []
			.concat(getReactWebpackConfiguration(...args))
			.concat(getNgWebpackConfiguration(...args));
	},
};
