const spawn = require('cross-spawn');
const { resolveBin, hereRelative } = require('../utils/path-resolver');
const { getUserConfigFile } = require('../utils/env');

const webpack = resolveBin('webpack');

function buildUMD(env, presetApi, options = []) {
	return spawn.sync(
		webpack,
		['--config', hereRelative(__dirname, '../config/webpack.config.js')].concat(options),
		{ stdio: 'inherit', env },
	);
}

module.exports = function build(env, presetApi, options) {
	const packageJSON = require(getUserConfigFile(['package.json']));
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
};
