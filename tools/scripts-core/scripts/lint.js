/* eslint-disable import/extensions */

import spawn from 'cross-spawn';
import path from 'path';
import { resolveBin, getPkgRootPath } from '../utils/path-resolver.js';
import { getUserConfigFile } from '../utils/env.js';

async function lintEs(env, presetApi, options) {
	const configRootPath = getPkgRootPath('@talend/eslint-config');

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

	const eslint = resolveBin('eslint');

	return spawn.sync(eslint, args, {
		stdio: 'inherit',
		env,
	});
}

async function lintStyle(env, presetApi, options) {
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

	const stylelint = resolveBin('stylelint');

	return spawn.sync(stylelint, args, {
		stdio: 'inherit',
		env,
	});
}

export default async function lint(env, presetApi, options) {
	let resEs;
	let resStyle;
	try {
		resEs = await lintEs(env, presetApi, options);
	} catch (e) {
		console.error(e);
	}
	try {
		resStyle = await lintStyle(env, presetApi, options);
	} catch (e) {
		console.error(e);
	}
	return [resEs, resStyle];
}
