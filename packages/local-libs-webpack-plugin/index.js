const path = require('path');

function getJson(filePath) {
	return require(path.resolve(filePath)); // eslint-disable-line global-require
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
				.filter(([key, value]) => {
					if (value === true && key !== undefined) {
						return true;
					}
					return false;
				})
				.map(([key]) => key);
		}
	}

	apply(compiler) {
		/* eslint-disable no-param-reassign */
		const linkedLibs = getLinkedLibs(this.options);
		if (!linkedLibs.length) {
			return;
		}

		if (!compiler.options.resolve) {
			compiler.options.resolve = {};
		}

		if (!compiler.options.resolve.alias) {
			compiler.options.resolve.alias = {};
		}

		// peerDependencies should use project's node_modules - not the library's
		// this will avoid issues like "multiple instances of react running"
		linkedLibs.forEach(lib => {
			Object.keys(lib.peerDependencies).forEach(peerDependency => {
				compiler.options.resolve.alias[peerDependency] = path.resolve('./node_modules', peerDependency);
			});
		});

		// Add the linked libs last - to override if any of them are also listed as peerDependencies
		linkedLibs.forEach(lib => {
			compiler.options.resolve.alias[lib.name] = path.resolve(lib.path);
		});

		// Look in webpack repo (NormalModuleReplacementPlugin) how to convert to webpack 4 when needed
		compiler.plugin('normal-module-factory', nmf => {
			nmf.plugin('before-resolve', (result, callback) => {
				if (!result) {
					return callback();
				}
				linkedLibs.forEach(lib => {
					if (result.request.startsWith(lib.name)) {
						// convert paths to use mainSrc (should also work on long import paths)
						// Examples: '@talend/somelib', '@talend/somelib/some/path'
						if (lib.mainSrc && lib.main) {
							result.request = libToSrcPath(result.request, lib);
						}
						result.request = result.request.replace(lib.name, lib.path);
					}

					if (result.request.startsWith('.') && result.context.includes(lib.path)) {
						// Example request: './SomeComponent'
						// First we add the context (full absolute path), then transform to mainSrc path
						const absolutePath = path.resolve(result.context, result.request);
						result.request = absolutePath.replace(`${lib.path}/${lib.main}`, `${lib.path}/${lib.mainSrc}`);
					}
				});
				return callback(null, result);
			});
		});

		console.log('LocalLibsWebpackPlugin: Link the following libs:'); // eslint-disable-line no-console

		Object.keys(compiler.options.resolve.alias).forEach(item => {
			console.log(`Link "${item}" to: "${compiler.options.resolve.alias[item]}"`); // eslint-disable-line no-console
		});
		/* eslint-enable no-param-reassign */
	}
}

module.exports = LocalLibsWebpackPlugin;
