const spawn = require('cross-spawn');
const { hereRelative, resolveBin } = require('../utils/path-resolver');

const rimraf = resolveBin('rimraf');
const webpack = resolveBin('webpack');

const argv = process.argv.slice(3);

module.exports = function build(env) {
	// remove old builds folder
	const rmResult = spawn.sync(rimraf, ['./dist'], { stdio: 'inherit', env });
	if (rmResult.status === 0) {
		console.log('Folders ./dist removed successfully');
	}
	const options = [
		'--config',
		hereRelative(__dirname, '../config/webpack.config.js'),
		'--progress',
		...argv,
	];
	// Run webpack dev server
	return spawn.sync(webpack, options, { stdio: 'inherit', env });
};
