const path = require('path');

/**
 * Require a json file
 * @param {string} filePath path to a json file
 */
function getJson(filePath) {
	return require(path.resolve(filePath)); // eslint-disable-line global-require
}

/**
 * Check if filePath is a lerna.json file
 * @param {isLerna} filePath Path to file
 */
function isLerna(filePath) {
	return filePath.includes('lerna.json');
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

function getLinkedLibs(paths) {
	const linkedLibs = [];
	paths.forEach(packagePath => {
		if (isLerna(packagePath)) {
			getJson(packagePath).packages.map(subPackagePath => {
				const packageJsonPath = packagePath.replace('lerna.json', `${subPackagePath}/package.json`);
				linkedLibs.push(getPackageJsonInfo(packageJsonPath));
			});
		} else {
			linkedLibs.push(getPackageJsonInfo(packagePath));
		}
	});
	return linkedLibs;
}

function convertRequests(request, linkedLibs) {
	linkedLibs.forEach(lib => {
		if (request === lib.name) {
			request = `${lib.path}/${lib.mainSrc}`;
		} else if (request.includes(lib.name)) {
			request = request.replace(`${lib.name}/${lib.main}`, `${lib.path}/${lib.mainSrc}`);
		}
	});
	return request;
}

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

class LocalLibsWebpackPlugin {
	constructor(options) {
		this.linkedLibs = getLinkedLibs(
			Object.entries(options)
				.filter(([packageJsonPath, enabled]) => enabled === true)
				.map(([packageJsonPath]) => packageJsonPath),
		);
	}

	apply(compiler) {
		if (!this.linkedLibs.length) {
			return;
		}

		if (!compiler.options.resolve) {
			compiler.options.resolve = {};
		}

		if (!compiler.options.resolve.alias) {
			compiler.options.resolve.alias = {};
		}

		// eslint-disable-next-line no-param-reassign
		compiler.options.resolve.alias = addAliases(this.linkedLibs, compiler.options.resolve.alias);

		// Look in webpack repo (NormalModuleReplacementPlugin) how to convert to webpack 4 when needed
		// This plugin is necessary to handle all special imports, for example long import paths or imports from inside a linked lib
		compiler.plugin('normal-module-factory', nmf => {
			nmf.plugin('before-resolve', (result, callback) => {
				if (!result) {
					return callback();
				}
				result.request = convertRequests(result.request, this.linkedLibs);
				return callback(null, result);
			});
		});

		console.log('LocalLibsWebpackPlugin: Link the following libs:'); // eslint-disable-line no-console
		Object.keys(compiler.options.resolve.alias).forEach(
			item => console.log(`Link "${item}" to: "${compiler.options.resolve.alias[item]}"`), // eslint-disable-line no-console
		);
	}
}

module.exports = LocalLibsWebpackPlugin;
