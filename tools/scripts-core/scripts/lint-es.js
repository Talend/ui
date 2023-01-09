/* eslint-disable import/extensions */
import spawn from 'cross-spawn';
import path from 'path';
import { resolveBin, getPkgRootPath } from '../utils/path-resolver.js';
import { getUserConfigFile } from '../utils/env.js';

const eslint = resolveBin('eslint');

export default async function lintEs(env, presetApi, options) {
	const configRootPath = getPkgRootPath('@talend/scripts-config-eslint');

	const eslintConfigPath =
		getUserConfigFile([
			'.eslintrc.js',
			'.eslintrc.yaml',
			'.eslintrc.yml',
			'.eslintrc.json',
			'.eslintrc',
		]) || path.join(configRootPath, '.eslintrc.js');
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
