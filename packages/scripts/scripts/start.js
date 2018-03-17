const spawn = require('cross-spawn');
const { hereRelative, resolveBin } = require('../utils/path-resolver');

const webpackDevServer = resolveBin('webpack-dev-server');

module.exports = function start(env) {
	return spawn.sync(
		webpackDevServer,
		[
			'--inline',
			'--config', hereRelative(__dirname, '../config/webpack.config.js'),
			'--content-base', 'build/',
		],
		{ stdio: 'inherit', env }
	);
};

