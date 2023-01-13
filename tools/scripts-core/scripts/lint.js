import path from 'path';
import * as utils from '@talend/scripts-utils';
import { getUserConfigFile } from '../utils/env.js';
import { globMatch } from '../utils/glob.js';

function getSmartOptions(opts, categories) {
	return opts.reduce(
		(acc, opt) => {
			let added;
			Object.keys(categories).forEach(cat => {
				if (!acc[cat]) {
					acc[cat] = [];
				}
				const found = categories[cat].find(ext => opt.endsWith(ext));
				if (found && !added) {
					added = true;
					acc[cat].push(opt);
				}
			});
			if (!added) {
				acc.rest.push(opt);
			}
			return acc;
		},
		{ rest: [], js: [], css: [] },
	);
}

async function lintEs(env, presetApi, options) {
	const configRootPath = utils.path.getPkgRootPath('@talend/eslint-config');

	const eslintConfigPath =
		getUserConfigFile([
			'.eslintrc.js',
			'.eslintrc.yaml',
			'.eslintrc.yml',
			'.eslintrc.json',
			'.eslintrc',
		]) || path.join(configRootPath, 'index.js');
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

	const eslint = utils.path.resolveBin('eslint');

	return utils.process.spawn(eslint, args, {
		stdio: 'inherit',
		env,
	});
}

async function lintStyle(env, presetApi, options) {
	const configRootPath = utils.path.getPkgRootPath('@talend/scripts-config-stylelint');
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
	utils.pkg.checkPackageIsInstalled('@talend/scripts-config-stylelint');
	const stylelint = utils.path.resolveBin('stylelint');

	return utils.process.spawn(stylelint, args, {
		stdio: 'inherit',
		env,
	});
}

export default async function lint(env, presetApi, options) {
	const smartOpts = getSmartOptions(options, {
		js: ['.js', '.ts', '.tsx'],
		css: ['.css', '.scss'],
	});

	let errEs;
	let errStyle;
	let resEs;
	let resStyle;
	if (smartOpts.js.length !== 0 || (smartOpts.js.length === 0 && smartOpts.css.length === 0)) {
		try {
			resEs = await lintEs(env, presetApi, smartOpts.js.concat(smartOpts.rest));
		} catch (e) {
			errEs = e;
			console.error(e);
		}
	}
	let hasStyle = await globMatch('./src/**/*.*css');
	if (
		smartOpts.css.length !== 0 ||
		(smartOpts.js.length === 0 && smartOpts.css.length === 0 && hasStyle)
	) {
		try {
			resStyle = await lintStyle(env, presetApi, smartOpts.css.concat(smartOpts.rest));
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
