const spawn = require('cross-spawn');
const { hereRelative, resolveBin } = require('../utils/path-resolver');

const rimraf = resolveBin('rimraf');
const webpack = resolveBin('webpack');

module.exports = function build(env) {
	// remove old builds folder
	const rmResult = spawn.sync(
		rimraf,
		['./build', './dist'],
		{ stdio: 'inherit', env }
	);
	if (rmResult.status === 0) {
		console.log('Folders ./dist and ./build removed successfully');
	}

	// Run webpack dev server
	return spawn.sync(
		webpack,
		['--config', hereRelative(__dirname, '../config/webpack.config.js')],
		{ stdio: 'inherit', env }
	);
};
