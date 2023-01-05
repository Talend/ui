const spawn = require('cross-spawn');
const { hereRelative, resolveBin } = require('../utils/path-resolver.cjs');

const webpack = resolveBin('webpack');

module.exports = function build(env, _, options) {
	return spawn.sync(
		webpack,
		['--config', hereRelative(__dirname, '../config/webpack.config.cjs'), '--progress', ...options],
		{ stdio: 'inherit', env },
	);
};
