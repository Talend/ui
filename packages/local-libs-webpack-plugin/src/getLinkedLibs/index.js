const getJson = require('../getJson');
const isLerna = require('../isLerna');
const getPackageJsonInfo = require('../getPackageJsonInfo');

function getLinkedLibs(paths) {
	const linkedLibs = [];
	paths.forEach(packagePath => {
		if (isLerna(packagePath)) {
			getJson(packagePath).packages.forEach(subPackagePath => {
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
