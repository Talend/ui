/* eslint-disable import/extensions */
import spawn from 'cross-spawn';
import path from 'path';
import { resolveBin, getPkgRootPath } from '../utils/path-resolver.js';
import { getUserConfigFile } from '../utils/env.js';

const stylelint = resolveBin('stylelint');

export default async function lintCss(env, presetApi, options) {
	const configRootPath = getPkgRootPath('@talend/scripts-config-stylelint');
	const stylelintConfigPath =
		getUserConfigFile([
			'.stylelintrc.js',
			'.stylelintrc.yaml',
			'.stylelintrc.yml',
			'.stylelintrc.json',
			'stylelint.config.js',
			'.stylelintrc',
		]) || path.join(configRootPath, '.stylelintrc.js');
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
