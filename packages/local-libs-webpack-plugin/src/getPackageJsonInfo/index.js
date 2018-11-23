/**
 * Return an object with info about package
 * @param {string} packagePath path to package.json
 */
function getPackageJsonInfo(packagePath) {
	const packageJson = getJson(packagePath);
	return {
		name: packageJson.name,
		path: path.resolve(packagePath.replace('/package.json', '')),
		mainSrc: pathWithoutFilename(packageJson.mainSrc),
		main: pathWithoutFilename(packageJson.main),
		peerDependencies: packageJson.peerDependencies || {},
	};
}
