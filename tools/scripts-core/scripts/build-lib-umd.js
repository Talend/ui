import fs from 'fs';
import * as utils from '@talend/scripts-utils';
import { getUserConfigFile } from '../utils/env.js';

const webpack = utils.path.resolveBin('webpack');
// eslint-disable-next-line @typescript-eslint/naming-convention
const dirname = utils.path.getDirName(import.meta.url);

async function buildUMD(env, presetApi, options = []) {
	return utils.process.spawn(
		webpack,
		['--config', utils.path.hereRelative(dirname, '../config/webpack.config.js')].concat(options),
		{ stdio: 'inherit', env },
	);
}

export default async function build(env, presetApi, options) {
	utils.pkg.checkPackageIsInstalled('@talend/scripts-config-react-webpack');
	const packageJSON = JSON.parse(fs.readFileSync(getUserConfigFile(['package.json'])));
	const UMDName = packageJSON.name
		.replace(/[^a-zA-Z0-9]/g, ' ')
		.split(' ')
		.map(w => w.replace(/./, m => m.toUpperCase()))
		.join('');

	return buildUMD(env, presetApi, options.concat(['--env', `umd=${UMDName}`], options));
}
