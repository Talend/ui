import fs from 'fs';

import * as utils from '@talend/scripts-utils';

import { getUserConfigFile } from '../utils/env.js';

const dirname = utils.path.getDirName(import.meta.url);

async function buildUMD(env, presetApi, options = []) {
	return utils.process.spawn(
		new URL(import.meta.resolve('webpack/bin/webpack.js')).pathname,
		['--config', utils.path.hereRelative(dirname, '../config/webpack.config.js')].concat(options),
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
