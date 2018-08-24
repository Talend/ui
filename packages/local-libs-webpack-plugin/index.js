const path = require('path');

function getJson(filePath) {
	return require(path.resolve(filePath));
}

function isLerna(filePath) {
	if (filePath.includes('lerna.json')) {
		return true;
	}
	return false;
}

/**
 * `mylib/lib/package.json` -> `mylib/lib`
 */

function pathWithoutFilename(filePath) {
	if (filePath.indexOf('/') > 0) {
		return filePath.substr(0, filePath.lastIndexOf('/'));
	}
	if (filePath.indexOf('.') === -1) {
		return filePath;
	}
	return '';
}

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
 * `mylib/lib/somefile` -> `mylib/src/somefile`
 */
function libToSrcPath(libPath, lib) {
	return libPath.replace(`${lib.name}/${lib.main}`, `${lib.name}/${lib.mainSrc}`);
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

class LocalLibsWebpackPlugin {
	constructor(options = []) {
		if (Array.isArray(options)) {
			this.options = options;
		} else {
			this.options = Object.entries(options)
				.map(([key, value]) => {
					if (value === true) {
						return key;
					}
				})
				.filter(option => option !== undefined);
		}
	}

	apply(compiler) {
		const linkedLibs = getLinkedLibs(this.options);
		if (!linkedLibs.length) {
			return;
		}

		// use src files instead of lib files (if mainSrc field exist in package.json)
		// this is useful when you don't want to run prepublish after every change
		compiler.options.resolve.mainFields = ['mainSrc', 'browser', 'module', 'main'];

		// peerDependencies should use project's node_modules - not the library's
		// this will avoid multiple instances of react issue for example
		linkedLibs.forEach(lib => {
			Object.keys(lib.peerDependencies).forEach(peerDependency => {
				compiler.options.resolve.alias[peerDependency] = path.resolve('node_modules', peerDependency);
			})
		});
		compiler.options.resolve.alias.react = path.resolve('node_modules/react');
		compiler.options.resolve.alias['react-dom'] = path.resolve('node_modules/react-dom');

		// Look in webpack repo (NormalModuleReplacementPlugin) how to convert this to webpack 4 when needed
		compiler.plugin('normal-module-factory', nmf => {
			nmf.plugin('before-resolve', (result, callback) => {
				if (!result) {
					return callback();
				}
				linkedLibs.forEach(lib => {
					if (result.request.startsWith(lib.name)) {
						if (lib.mainSrc && lib.main) {
							result.request = libToSrcPath(result.request, lib);
						}
						result.request = result.request.replace(lib.name, lib.path);
					}
				});
				return callback(null, result);
			});
		});
	}
}

module.exports = LocalLibsWebpackPlugin;
