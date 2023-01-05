/* eslint-disable import/extensions */
import spawn from 'cross-spawn';
import { hereRelative, resolveBin } from '../utils/path-resolver.js';

const webpack = resolveBin('webpack');

export default function build(env, _, options) {
	return spawn.sync(
		webpack,
		['--config', hereRelative(__dirname, '../config/webpack.config.js'), '--progress', ...options],
		{ stdio: 'inherit', env },
	);
}
