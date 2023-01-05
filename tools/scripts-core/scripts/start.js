/* eslint-disable import/extensions */
import spawn from 'cross-spawn';
import { getDirName } from '../utils/dirname.js';
import { hereRelative, resolveBin } from '../utils/path-resolver.js';

const webpack = resolveBin('webpack');

export default function start(env, _, options) {
	return spawn.sync(
		webpack,
		[
			'serve',
			'--config',
			hereRelative(getDirName(import.meta.url), '../config/webpack.config.js'),
			'--progress',
			...options,
		],
		{ stdio: 'inherit', env },
	);
}
