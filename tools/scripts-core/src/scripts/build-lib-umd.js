import fs from 'fs';

import * as utils from '@talend/scripts-utils';

import { resolveScript } from '../utils/bin.js';
import { getUserConfigFile } from '../utils/env.js';

const dirname = utils.path.getDirName(import.meta.url);

async function buildUMD(env, presetApi, options = []) {
	return utils.process.spawn(
		'node',
		[
			resolveScript('webpack/bin/webpack.js'),
			'--config',
			utils.path.hereRelative(dirname, '../config/webpack.config.js'),
		].concat(options),
		{ stdio: 'inherit', env },
	);
}

export default async function build(env, presetApi, options) {
	const packageJSON = JSON.parse(fs.readFileSync(getUserConfigFile(['package.json'])));
	const UMDName = packageJSON.name
		.replace(/[^a-zA-Z0-9]/g, ' ')
		.split(' ')
		.map(w => w.replace(/./, m => m.toUpperCase()))
		.join('');

	return buildUMD(env, presetApi, options.concat(['--env', `umd=${UMDName}`], options));
}
