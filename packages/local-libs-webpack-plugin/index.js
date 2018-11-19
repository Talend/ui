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

function getPackageJsonInfo(packagePath) {
	const packageJson = getJson(packagePath);
	return {
		name: packageJson.name,
		path: path.resolve(packagePath.replace('/package.json', '')),
		mainSrc: packageJson.mainSrc,
		main: packageJson.main,
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
			// TODO: make recursive?
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

function formatOptions(options = []) {
	if (Array.isArray(options)) {
		return options;
	} else {
		return Object.entries(options)
			.filter(([key, value]) => {
				if (value === true && key !== undefined) {
					return true;
				}
				return false;
			})
			.map(([key]) => key);
	}
}

function convertRequests(request, linkedLibs) {
	// TODO: nicer code, better return
	linkedLibs.forEach(lib => {
		if (request.startsWith(lib.name)) {
			if (request.length === lib.name.length) {
				request = `${lib.path}/${lib.mainSrc}`;
			} else {
				request = request.replace(`${lib.name}/${pathWithoutFilename(lib.main)}`, `${lib.path}/${pathWithoutFilename(lib.mainSrc)}`);
			}
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
		aliases[lib.name] = path.resolve(lib.path);
	});

	return aliases;
}

class LocalLibsWebpackPlugin {
	constructor(options) {
		this.options = formatOptions(options);
	}

	apply(compiler) {
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

		// eslint-disable-next-line no-param-reassign
		compiler.options.resolve.alias = addAliases(linkedLibs, compiler.options.resolve.alias);

		// Look in webpack repo (NormalModuleReplacementPlugin) how to convert to webpack 4 when needed
		// This plugin is necessary to handle all special imports, for example long import paths or imports from inside a linked lib
		compiler.plugin('normal-module-factory', nmf => {
			nmf.plugin('before-resolve', (result, callback) => {
				if (!result) {
					return callback();
				}
				result.request = convertRequests(result.request, linkedLibs);
				return callback(null, result);
			});
		});

		console.log('LocalLibsWebpackPlugin: Link the following libs:'); // eslint-disable-line no-console
		Object.keys(compiler.options.resolve.alias).forEach(item => (
			console.log(`Link "${item}" to: "${compiler.options.resolve.alias[item]}"`) // eslint-disable-line no-console
		));
	}
}

module.exports = LocalLibsWebpackPlugin;
