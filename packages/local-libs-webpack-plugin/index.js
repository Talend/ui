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

function getPackageJsonInfo(packagePath) {
	const packageJson = getJson(packagePath);
	return {
		name: packageJson.name,
		path: path.resolve(packagePath.replace('/package.json', '')),
		peerDependencies: packageJson.peerDependencies || {},
	};
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

		// use src files instead of lib files (if mainSrc field exist in package.json)
		// this is useful when you don't want to run prepublish after every change
		// But your local webpack config must be able to bundle the lib's source code
		compiler.options.resolve.mainFields = ['mainSrc', 'browser', 'module', 'main'];

		// peerDependencies should use project's node_modules - not the library's
		// this will avoid multiple instances of react issue for example
		linkedLibs.forEach(lib => {
			Object.keys(lib.peerDependencies).forEach(peerDependency => {
				compiler.options.resolve.alias[peerDependency] = path.resolve('./node_modules', peerDependency);
			});
		});

		// Add the linked libs last - to override if any of them are peerDependencies
		linkedLibs.forEach(lib => {
			compiler.options.resolve.alias[lib.name] = path.resolve(lib.path);
		});

		console.log('LocalLibsWebpackPlugin: Link the following libs:'); // eslint-disable-line no-console

		Object.keys(compiler.options.resolve.alias).forEach(item => {
			console.log(`Link "${item}" to: "${compiler.options.resolve.alias[item]}"`); // eslint-disable-line no-console
		});
		/* eslint-enable no-param-reassign */
	}
}

module.exports = LocalLibsWebpackPlugin;
