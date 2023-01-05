const spawn = require('cross-spawn');
const { hereRelative, resolveBin } = require('../utils/path-resolver.cjs');

const webpack = resolveBin('webpack');

module.exports = function start(env, _, options) {
	return spawn.sync(
		webpack,
		[
			'serve',
			'--config',
			hereRelative(__dirname, '../config/webpack.config.cjs'),
			'--progress',
			...options,
		],
		{ stdio: 'inherit', env },
	);
};
