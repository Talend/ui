const path = require('path');
const pathWithoutFilename = require('./pathWithoutFilename');

/**
 * Return an object with info about package
 * @param {string} packagePath path to package.json
 */
function getPackageJsonInfo(packagePath) {
	const packageJson = require(path.resolve(packagePath)); // eslint-disable-line global-require
	return {
		name: packageJson.name,
		path: path.resolve(packagePath.replace('/package.json', '')),
		mainSrc: pathWithoutFilename(packageJson.mainSrc),
		main: pathWithoutFilename(packageJson.main),
		peerDependencies: packageJson.peerDependencies || {},
	};
}

module.exports = getPackageJsonInfo;
