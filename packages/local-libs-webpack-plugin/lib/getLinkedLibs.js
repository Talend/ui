const path = require('path');
const getPackageJsonInfo = require('./getPackageJsonInfo');

/**
 * Get an array of linkedLibs based on an array of paths to package.json/lerna.json
 * @param {array} paths Array of paths to package.json or lerna.json
 */
function getLinkedLibs(paths) {
	const linkedLibs = [];
	paths.forEach(packagePath => {
		if (packagePath.endsWith('lerna.json')) {
			// eslint-disable-next-line global-require
			const packages = require(path.resolve(packagePath)).packages;
			packages.forEach(subPackagePath => {
				const packageJsonPath = packagePath.replace('lerna.json', `${subPackagePath}/package.json`);
				linkedLibs.push(getPackageJsonInfo(packageJsonPath));
			});
		} else {
			linkedLibs.push(getPackageJsonInfo(packagePath));
		}
	});
	return linkedLibs;
}

module.exports = getLinkedLibs;
