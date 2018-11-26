function addAliases(linkedLibs, aliases) {
	// peerDependencies should use project's node_modules - not the library's
	// this will avoid issues like "multiple instances of react running"
	linkedLibs.forEach(lib => {
		Object.keys(lib.peerDependencies).forEach(peerDependency => {
			aliases[peerDependency] = path.resolve('./node_modules', peerDependency);
		});
	});

	// Add the linked libs last - to override if any of them are also listed as peerDependencies
	linkedLibs.forEach(lib => {
		aliases[lib.name] = lib.path;
	});

	return aliases;
}

function convertRequests(request, linkedLibs) {
	linkedLibs.forEach(lib => {
		if (request === lib.name) {
			// myLib -> Users/me/projects/myLib/src/index.js
			request = `${lib.path}/${lib.mainSrc}`;
		} else if (request.includes(lib.name)) {
			// myLib/something -> Users/me/projects/myLib/src/something
			request = request.replace(`${lib.name}/${lib.main}`, `${lib.path}/${lib.mainSrc}`);
		}
	});
	return request;
}

/**
 * Require a json file
 * @param {string} filePath path to a json file
 */
function getJson(filePath) {
	return require(path.resolve(filePath)); // eslint-disable-line global-require
}

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

/**
 * Check if filePath is a lerna.json file
 * @param {isLerna} filePath Path to file
 */
function isLerna(filePath) {
	return filePath.includes('lerna.json');
}

/**
 * Remove file from a filepath
 * @param {string} filePath filePath
 */
function pathWithoutFilename(filePath) {
	const dirs = filePath.split('/');
	if (dirs[dirs.length - 1].includes('.')) {
		dirs.pop();
	}
	return dirs.join('/');
}

module.exports = {
	addAliases,
	convertRequests,
	getJson,
	getLinkedLibs,
	getPackageJsonInfo,
	isLerna,
	pathWithoutFilename,
};
