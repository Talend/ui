const spawn = require('cross-spawn');
const { resolveBin } = require('../utils/path-resolver');
const { getPreset } = require('../utils/preset');
const { getUserConfigFile } = require('../utils/env');

const stylelint = resolveBin('stylelint');

module.exports = function lintCss(env, presetApi, options) {
	const presetName = presetApi.getUserConfig(['preset'], 'talend');
	const preset = getPreset(presetName);
	const stylelintConfigPath =
		getUserConfigFile([
			'.stylelintrc.js',
			'.stylelintrc.yaml',
			'.stylelintrc.yml',
			'.stylelintrc.json',
			'stylelint.config.js',
			'.stylelintrc',
		]) || preset.getStylelintConfigurationPath(presetApi);

	return spawn.sync(stylelint, ['--config', stylelintConfigPath, './src/**/*.*css', ...options], {
		stdio: 'inherit',
		env,
	});
};
