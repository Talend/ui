import fs from 'fs';
import { resolveBin, hereRelative } from '../utils/path-resolver.js';
import { getUserConfigFile } from '../utils/env.js';
import { getDirName } from '../utils/dirname.js';
import { check } from '../utils/preset.js';
import { mySpawn } from '../utils/spawn.js';

const webpack = resolveBin('webpack');
// eslint-disable-next-line @typescript-eslint/naming-convention
const dirname = getDirName(import.meta.url);

async function buildUMD(env, presetApi, options = []) {
	return mySpawn(
		webpack,
		['--config', hereRelative(dirname, '../config/webpack.config.js')].concat(options),
		{ stdio: 'inherit', env },
	);
}

export default async function build(env, presetApi, options) {
	check('@talend/scripts-config-react-webpack');
	const packageJSON = JSON.parse(fs.readFileSync(getUserConfigFile(['package.json'])));
	const UMDName = packageJSON.name
		.replace(/[^a-zA-Z0-9]/g, ' ')
		.split(' ')
		.map(w => w.replace(/./, m => m.toUpperCase()))
		.join('');

	return buildUMD(env, presetApi, options.concat(['--env', `umd=${UMDName}`], options));
}
