/* eslint-disable import/extensions */
import spawn from 'cross-spawn';
import { resolveBin } from '../utils/path-resolver.js';
import { getPreset } from '../utils/preset.js';
import { getUserConfigFile } from '../utils/env.js';

const eslint = resolveBin('eslint');

export default async function lintEs(env, presetApi, options) {
	const presetName = presetApi.getUserConfig(['preset'], '@talend/scripts-preset-react-lib');
	const preset = await getPreset(presetName);
	const eslintConfigPath =
		getUserConfigFile([
			'.eslintrc.js',
			'.eslintrc.yaml',
			'.eslintrc.yml',
			'.eslintrc.json',
			'.eslintrc',
		]) || preset.getEslintConfigurationPath(presetApi);
	const args = ['--config', eslintConfigPath, '--ext', '.js,.ts,.tsx', './src', ...options];

	// https://docs.github.com/en/actions/learn-github-actions/environment-variables#default-environment-variables
	if (process.env.CI && process.env.GITHUB_ACTIONS) {
		if (!options.includes('-o')) {
			args.push('-o', 'eslint-report.json');
		}
		if (!options.includes('--format')) {
			args.push('--format', 'json');
		}
	}
	return spawn.sync(eslint, args, {
		stdio: 'inherit',
		env,
	});
}
