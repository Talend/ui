/* eslint-disable import/extensions */
import spawn from 'cross-spawn';
import { getDirName } from '../utils/dirname.js';
import { hereRelative, resolveBin } from '../utils/path-resolver.js';
import { getPresetEnv } from '../utils/preset.js';
import buildLib from './build-lib.js';
import buildUMD from './build-lib-umd.js';

export default function build(env, _, options) {
	const packageType = getPresetEnv();
	if (packageType.isApp) {
		check('@talend/scripts-config-react-webpack');
		const webpack = resolveBin('webpack');
		return spawn.sync(
			webpack,
			[
				'--config',
				hereRelative(getDirName(import.meta.url), '../config/webpack.config.js'),
				'--progress',
				...options,
			],
			{ stdio: 'inherit', env },
		);
	}
	if (packageType.isLib) {
		// detect UMD here
		if (options.includes('--umd')) {
			check();
			return buildUMD(
				env,
				_,
				options.filter(o => o !== '--umd'),
			);
		}
		return buildLib(env, _, options);
	}
}
