/* eslint-disable import/extensions */
import spawn from 'cross-spawn';
import fs from 'fs';
import { resolveBin, hereRelative } from '../utils/path-resolver.js';
import { getUserConfigFile } from '../utils/env.js';
import { getDirName } from '../utils/dirname.js';

const webpack = resolveBin('webpack');
// eslint-disable-next-line @typescript-eslint/naming-convention
const dirname = getDirName(import.meta.url);

function buildUMD(env, presetApi, options = []) {
	return spawn.sync(
		webpack,
		['--config', hereRelative(dirname, '../config/webpack.config.js')].concat(options),
		{ stdio: 'inherit', env },
	);
}

export default function build(env, presetApi, options) {
	const packageJSON = JSON.parse(fs.readFileSync(getUserConfigFile(['package.json'])));
	const UMDName = packageJSON.name
		.replace(/[^a-zA-Z0-9]/g, ' ')
		.split(' ')
		.map(w => w.replace(/./, m => m.toUpperCase()))
		.join('');

	const { status: buildUMDStatus } = buildUMD(
		env,
		presetApi,
		options.concat(['--env', `umd=${UMDName}`], options),
	);

	return { status: buildUMDStatus };
}
