const spawn = require('cross-spawn');
const { hereRelative, resolveBin } = require('../utils/path-resolver');

const webpackDevServer = resolveBin('webpack-dev-server');

module.exports = function start(env, _, options) {
	return spawn.sync(
		webpackDevServer,
		[
			'--config',
			hereRelative(__dirname, '../config/webpack.config.js'),
			'--progress',
			'--display-error-details',
			...options,
		],
		{ stdio: 'inherit', env },
	);
};
