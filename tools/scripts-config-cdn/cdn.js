/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-empty */
const path = require('path');
const fs = require('fs');
const moduleToCdn = require('@talend/module-to-cdn');
const DynamicCdnWebpackPlugin = require('@talend/dynamic-cdn-webpack-plugin');
const { findPackage } = require('@talend/dynamic-cdn-webpack-plugin/src/find');
const lockfile = require('@yarnpkg/lockfile');
const modules = require('./modules.json');
const umds = require('./umds.json');
const { download } = require('./utils');

const CDN_URL = 'https://statics-dev.cloud.talend.com';

function getModuleName(nameandversion) {
	const split = nameandversion.split('@');
	if (nameandversion.startsWith('@')) {
		return `@${split[1]}`;
	}
	return split[0];
}

function addToCopyConfig(info, config) {
	if (info && info.local) {
		// Copy the entire folder.
		// The only risk here is dist dev and prod are not in the same folder...
		let from;
		if (fs.existsSync(info.local) && fs.lstatSync(info.local).isDirectory()) {
			from = path.resolve(info.local);
		} else {
			from = path.resolve(info.local, '..');
		}
		let to = path.relative(
			process.cwd(),
			path.resolve(`cdn/${info.name}/${info.version}${info.path}`, '../'),
		);
		if (!to.endsWith('/')) {
			to += '/';
		}
		if (fs.existsSync(from)) {
			config.push({ from, to, info: { minimized: true } });
		} else {
			const found = findPackage(info);
			if (!found) {
				console.error(`cdn: ${info.name}@${info.version} not found in your node_modules`);
			} else {
				from = path.resolve(`${found}${info.path}`, '..');
				if (fs.existsSync(from)) {
					config.push({ from, to, info: { minimized: true } });
				} else {
					console.error(`cdn: ${from} path not found`);
				}
			}
		}
	}
}

function addLocal(info) {
	if (info) {
		const pkg = findPackage(info);
		if (pkg) {
			info.local = `${pkg}${info.path}`;
		}
	}
	return info;
}

let talendModulesConfigured = false;
function configureTalendModules() {
	if (!talendModulesConfigured) {
		console.log('public resolver: setup talend addons');
		moduleToCdn.add(modules);
		talendModulesConfigured = true;
	}
}

function getAllFlattenDependencies(packageLockContent) {
	if (!packageLockContent) {
		return [];
	}

	// package-lock root
	if ('lockfileVersion' in packageLockContent) {
		return getAllFlattenDependencies(packageLockContent.dependencies);
	}

	return Object.entries(packageLockContent).reduce((accu, [name, info]) => {
		const infoWithName = { ...info, name };
		accu.push(infoWithName);

		if (info.dependencies) {
			accu.push(...getAllFlattenDependencies(info.dependencies));
		}

		return accu;
	}, []);
}

function getModulesFromLockFile(dir) {
	const cwd = dir || process.cwd();
	let infos = [];
	let lockType = 'package-lock.json';
	let lockPath = path.join(cwd, lockType);
	if (fs.existsSync(lockPath)) {
		const packagelock = require(lockPath);
		infos = getAllFlattenDependencies(packagelock)
			.map(({ name, version }) => moduleToCdn(name, version, { env: 'development' }))
			.map(addLocal);
	} else {
		lockType = 'yarn.lock';
		lockPath = path.join(cwd, lockType);
		if (fs.existsSync(lockPath)) {
			const json = lockfile.parse(fs.readFileSync(lockPath, 'utf-8'));
			infos = Object.keys(json.object)
				.map(moduleAndversion => {
					const moduleName = getModuleName(moduleAndversion);
					return moduleToCdn(moduleName, json.object[moduleAndversion].version, {
						env: 'development',
					});
				})
				.map(addLocal);
		} else {
			console.error(`No lockfile found in ${cwd}. Search in parent directory`);
			return getModulesFromLockFile(path.join(cwd, '..'));
		}
	}
	return infos;
}

function getCopyConfig() {
	const config = [];
	getModulesFromLockFile().forEach(info => {
		addToCopyConfig(info, config);
	});
	return config;
}

function installCustomBuilds(options) {
	moduleToCdn.add(umds);
	return Promise.all(
		getModulesFromLockFile()
			.filter(info => {
				if (!info) {
					return false;
				}
				if (!info.local) {
					return false;
				}
				if (!info.local.includes('/talend-umds/')) {
					return false;
				}
				if (fs.existsSync(info.local) && !options.includes('-f')) {
					return false;
				}
				const dir = path.dirname(info.local);
				if (!fs.existsSync(dir)) {
					fs.mkdirSync(dir);
				}
				return true;
			})
			.map(
				info =>
					new Promise((resolve, reject) => {
						// we do not want to configure moduleToCdn here so lets build url
						const url = `${CDN_URL}/${info.name}/${info.version}${info.path}`;
						const fp = download(url, options).then(data => {
							if (options.includes('-v')) {
								console.log('talend-scripts postinstall: write', info.local);
							}
							fs.writeFileSync(info.local, data);
							return data;
						});
						const depUrl = `${url}.dependencies.json`;
						const dp = download(depUrl).then(data => {
							fs.writeFileSync(`${info.local}.dependencies.json`, data);
							return data;
						});
						Promise.all([dp, fp])
							.then(responses => {
								resolve(responses);
							})
							.catch(errors => {
								console.error(errors);
								reject(errors);
							});
					}),
			),
	);
}

const CDN_CONFIG_URLS = [];
const CDN_CONFIG_PATHS = [];
try {
	const modulePath = require.resolve('@talend/scripts-config-cdn');
	CDN_CONFIG_URLS.push('https://unpkg.com/@talend/scripts-config-cdn@latest/modules.json');
	CDN_CONFIG_URLS.push('https://unpkg.com/@talend/scripts-config-cdn@latest/umds.json');
	CDN_CONFIG_PATHS.push(`${path.dirname(modulePath)}/modules.json`);
	CDN_CONFIG_PATHS.push(`${path.dirname(modulePath)}/umds.json`);
} catch {}
try {
	const modulePath = require.resolve('@talend/module-to-cdn');
	CDN_CONFIG_URLS.push('https://unpkg.com/@talend/module-to-cdn@latest/modules.json');
	CDN_CONFIG_PATHS.push(`${path.dirname(modulePath)}/modules.json`);
} catch {}

/**
 * updateCDNConfiguration download all modules.json available in the last version
 * available
 * @param {Array<string>} options
 */
function updateCDNConfiguration(options) {
	function saveInModule(data, index) {
		if (options.includes('-v')) {
			console.log(`talend-scripts postinstall: update ${CDN_CONFIG_PATHS[index]}`);
		}
		return fs.writeFileSync(CDN_CONFIG_PATHS[index], data);
	}
	return Promise.all(
		CDN_CONFIG_URLS.map(url => download(url, options)).map((p, index) =>
			p.then(data => saveInModule(data, index)),
		),
	);
}

function addURL(info, options) {
	let prefix = options.publicPath || '/';
	if (!prefix.endsWith('/')) {
		prefix += '/';
	}
	info.url = `${prefix}cdn/${info.name}/${info.version}${info.path}`;
	info.styleUrl = info.stylePath && `${prefix}cdn/${info.name}/${info.version}${info.stylePath}`;
	return info;
}

function resolver(importPath, version, options) {
	const info = moduleToCdn(importPath, version, options);
	if (!info) {
		return info;
	}
	addURL(info, options);
	return info;
}

function getWebpackPlugin(env, dcwpConfig = {}) {
	let defaultExclude = ['react-popper', 'react-css-transition', 'timezone-support'];
	if (env.talendumds) {
		moduleToCdn.add(umds);
		defaultExclude = [];
	}
	let loglevel = env.cdnlog;
	// option is passed throw cmd line and env by ui-scripts-core.
	if (Array.isArray(env.cdnlog)) {
		loglevel = env.cdnlog[0];
	}

	const { exclude = [], ...restConfig } = dcwpConfig;

	// timezone-support is removed because it has a dash in the global var and webpack do not support it ...=>  module.exports = timezone-support;
	// option 1: move to tz 2 but need to fork datefns-timezone
	// option 2: replace datefns-timezone with datefns-tz
	return new DynamicCdnWebpackPlugin({
		resolver,
		addURL,
		loglevel,
		exclude: defaultExclude.concat(exclude),
		...restConfig,
	});
}

function postInstall(options) {
	let promise = Promise.resolve();
	if (!options.includes('--no-umd-config-update')) {
		promise = promise.then(() => updateCDNConfiguration(options));
	}
	if (!options.includes('--no-install-custom-builds')) {
		promise = promise.then(() => installCustomBuilds(options));
	}
	return promise;
}

module.exports = {
	resolver,
	getCopyConfig,
	getWebpackPlugin,
	moduleToCdn,
	installCustomBuilds,
	updateCDNConfiguration,
	postInstall,
	getModulesFromLockFile,
	umds, // raw exposed for build script
	configureTalendModules,
};
