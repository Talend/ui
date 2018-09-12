const spawn = require('cross-spawn');
const { hereRelative, resolveBin } = require('../utils/path-resolver');

const rimraf = resolveBin('rimraf');
const webpack = resolveBin('webpack');

module.exports = function build(env) {
	// remove old builds folder
	const rmResult = spawn.sync(
		rimraf, ['./dist'],
		{ stdio: 'inherit', env }
	);
	if (rmResult.status === 0) {
		console.log('Folders ./dist removed successfully');
	}

	// Run webpack dev server
	return spawn.sync(
		webpack,
		['--config', hereRelative(__dirname, '../config/webpack.config.js'), '--progress'],
		{ stdio: 'inherit', env }
	);
};
