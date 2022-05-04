const spawn = require('cross-spawn');
const { resolveBin } = require('../utils/path-resolver');
const { getPreset } = require('../utils/preset');
const { getUserConfigFile } = require('../utils/env');

const eslint = resolveBin('eslint');

module.exports = function lintEs(env, presetApi, options) {
	const presetName = presetApi.getUserConfig(['preset'], '@talend/scripts-preset-react-lib');
	const preset = getPreset(presetName);
	const eslintConfigPath =
		getUserConfigFile([
			'.eslintrc.js',
			'.eslintrc.yaml',
			'.eslintrc.yml',
			'.eslintrc.json',
			'.eslintrc',
		]) || preset.getEslintConfigurationPath(presetApi);

	// https://docs.github.com/en/actions/learn-github-actions/environment-variables#default-environment-variables
	if (process.env.CI && process.env.GITHUB_ACTIONS) {
		if (!options.includes('-o')) {
			args.push('-o', 'eslint-report.json');
		}
		if (!options.includes('--format')) {
			args.push('--format', 'json');
		}
	}
	return spawn.sync(
		eslint,
		['--config', eslintConfigPath, '--ext', '.js,.ts,.tsx', './src', ...options],
		{
			stdio: 'inherit',
			env,
		},
	);
};
