const spawn = require('cross-spawn');
const { hereRelative, resolveBin } = require('../utils/path-resolver');

const webpack = resolveBin('webpack');

module.exports = function start(env, _, options) {
	return spawn.sync(
		webpack,
		[
			'serve',
			'--config',
			hereRelative(__dirname, '../config/webpack.config.js'),
			'--progress',
			...options,
		],
		{ stdio: 'inherit', env },
	);
};
