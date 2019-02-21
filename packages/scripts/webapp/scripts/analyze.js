const spawn = require('cross-spawn');
const { hereRelative, resolveBin } = require('../utils/path-resolver');
const webpack = resolveBin('webpack');

module.exports = function start(env) {
	return spawn.sync(
		webpack,
		[
			'--config',
			hereRelative(__dirname, '../config/webpack.config.js'),
			'--progress',
			'--env.analyze',
			'--display-error-details',
			'--display-cached',
		],
		{ stdio: 'inherit', env },
	);
};
