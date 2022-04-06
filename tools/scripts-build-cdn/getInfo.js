const moduleToCdn = require('@talend/module-to-cdn');
const fs = require('fs');
const semver = require('semver');

function getConfigFromLocalFile() {
	const configPath = `${process.cwd()}/talend-cdn.json`;
	if (fs.existsSync(configPath)) {
		return require(configPath);
	}
	return {};
}

function getPackageInfo(slug) {
	const info = {};
	const splitted = slug.split('@');
	const isScoped = slug.startsWith('@');
	if (isScoped && splitted.length > 2) {
		info.version = [splitted[2]];
		info.name = `@${splitted[1]}`;
	} else if (!isScoped && splitted.length > 1) {
		info.version = splitted[1];
		info.name = splitted[0];
	} else {
		info.name = slug;
	}
	return info;
}

function getInfo(args) {
	let config = moduleToCdn.getAllModules();
	const localConfig = getConfigFromLocalFile();
	const program = { ...localConfig, ...args };

	let customVersion;
	let customPackage;
	if (program.umd) {
		config = require(`${process.cwd()}/${program.umd}`);
		if (program.verbose) {
			console.log('umd file found and injected into module-to-cdn');
		}
		moduleToCdn.add(config);
	}
	function include(m) {
		if (program.exclude) {
			if (program.exclude.includes(`;${m};`)) {
				return false;
			}

			if (m.startsWith('@') && program.exclude.includes(`;${m.split('/')[0]};`)) {
				return false;
			}
		}

		return true;
	}
	/**
	 * Fill versions form a JSON files used to align multiple projects
	 * The fill may be passed as argument
	 */
	let VERSIONS = {};
	if (program.versions) {
		const versionPath = `${process.cwd()}/${program.versions}`;
		if (fs.existsSync(versionPath)) {
			if (program.verbose) {
				console.log(`versions file found and used ${program.versions}`);
			}
			VERSIONS = require(versionPath);
			// replace version number by a constraint
			Object.keys(VERSIONS).reduce((acc, key) => {
				acc[key] = `>= ${VERSIONS[key].replace('^', '')}`;
				return acc;
			}, VERSIONS);
		} else {
			console.error('Error: you have passed an invalid path to set the versions limit.');
		}
	}

	let packages = Object.keys(config).filter(m => include(m));
	if (program.from) {
		if (program.verbose) {
			console.log(`start from  ${program.from}`);
		}
		const info = getPackageInfo(program.from);
		customVersion = info.version;
		customPackage = info.name;
		const index = packages.indexOf(info.name);
		packages = packages.slice(index);
	}

	if (program.package) {
		if (program.verbose) {
			console.log(`filter on ${program.package}`);
		}
		const info = getPackageInfo(program.package);
		customVersion = info.version;
		customPackage = info.name;
		packages = [info.name];
	}
	if (program.verbose) {
		console.log(`found ${packages.length} packages`);
	}
	function getMatchedVersion(all, globalConstraint = '>= 0.0.0', moduleName) {
		return function filter(range) {
			return all
				.filter(version => {
					if (customVersion && moduleName === customPackage) {
						if (program.package) {
							return version === customVersion;
						}
						return semver.satisfies(version, `>= ${customVersion}`);
					}
					if (VERSIONS[moduleName]) {
						return semver.satisfies(version, VERSIONS[moduleName]);
					}
					return true;
				})
				.filter(version => semver.satisfies(version, globalConstraint))
				.filter(version => semver.satisfies(version, range));
		};
	}
	function isPrerelease(v) {
		// FIXME: remove this code ASAP. it is to support UMD alpha release of UI
		return semver.parse(v).prerelease.length > 0;
	}
	function getVersions(importPath) {
		const moduleName = moduleToCdn.getModuleName(importPath);
		const versionRanges = Object.keys(config[importPath].versions);
		const allVersions = moduleToCdn.cache.getAllVersions(moduleName).filter(v => !isPrerelease(v));
		const filteredVersions = [].concat(
			...versionRanges.map(getMatchedVersion(allVersions, undefined, moduleName)),
		);
		if (program.verbose) {
			console.log(`${filteredVersions.length} versions of ${moduleName}`);
		}
		return filteredVersions;
	}
	return {
		program,
		packages,
		config,
		getVersions,
	};
}

module.exports = getInfo;
