/* eslint-disable import/extensions */
import spawn from 'cross-spawn';
import { resolveBin } from '../utils/path-resolver.js';
import { getPreset } from '../utils/preset.js';
import { getUserConfigFile } from '../utils/env.js';

const stylelint = resolveBin('stylelint');

export default async function lintCss(env, presetApi, options) {
	const presetName = presetApi.getUserConfig(['preset'], '@talend/scripts-preset-react-lib');
	const preset = await getPreset(presetName);
	const stylelintConfigPath =
		getUserConfigFile([
			'.stylelintrc.js',
			'.stylelintrc.yaml',
			'.stylelintrc.yml',
			'.stylelintrc.json',
			'stylelint.config.js',
			'.stylelintrc',
		]) || preset.getStylelintConfigurationPath(presetApi);
	const args = ['--config', stylelintConfigPath, './src/**/*.*css', ...options];

	// https://docs.github.com/en/actions/learn-github-actions/environment-variables#default-environment-variables
	if (process.env.CI && process.env.GITHUB_ACTIONS) {
		if (!options.includes('-o')) {
			args.push('-o', 'stylelint-report.json');
		}
		if (!options.includes('--format')) {
			args.push('-f', 'json');
		}
	}
	return spawn.sync(stylelint, args, {
		stdio: 'inherit',
		env,
	});
}
