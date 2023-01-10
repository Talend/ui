/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable import/extensions */

import path from 'path';
import { resolveBin, getPkgRootPath } from '../utils/path-resolver.js';
import { getUserConfigFile } from '../utils/env.js';
import { mySpawn } from '../utils/spawn.js';
import { check } from '../utils/preset.js';
import { globMatch } from '../utils/glob.js';

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
	let args = ['--config', eslintConfigPath, '--ext', '.js,.ts,.tsx'];
	if (options.length > 0) {
		args = args.concat(options);
	} else {
		args.push('./src');
	}

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

	return mySpawn(eslint, args, {
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
	let args = ['--config', stylelintConfigPath];
	if (options.length > 0) {
		args = args.concat(options);
	} else {
		args.push('./src/**/*.*css');
	}

	// https://docs.github.com/en/actions/learn-github-actions/environment-variables#default-environment-variables
	if (process.env.CI && process.env.GITHUB_ACTIONS) {
		if (!options.includes('-o')) {
			args.push('-o', 'stylelint-report.json');
		}
		if (!options.includes('--format')) {
			args.push('-f', 'json');
		}
	}
	check('@talend/scripts-config-stylelint');
	const stylelint = resolveBin('stylelint');

	return mySpawn(stylelint, args, {
		stdio: 'inherit',
		env,
	});
}

export default async function lint(env, presetApi, options) {
	let errEs;
	let errStyle;
	let resEs;
	let resStyle;
	try {
		resEs = await lintEs(env, presetApi, options);
	} catch (e) {
		errEs = e;
		console.error(e);
	}
	let hasStyle = await globMatch('./src/**/*.*css');
	if (hasStyle) {
		try {
			resStyle = await lintStyle(env, presetApi, options);
		} catch (e) {
			errStyle = e;
			console.error(e);
		}
	}
	if (errEs) {
		throw errEs;
	}
	if (errStyle) {
		throw errStyle;
	}
	return [resEs, resStyle];
}
