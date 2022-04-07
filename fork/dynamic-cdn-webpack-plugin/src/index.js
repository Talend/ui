/* eslint-disable no-await-in-loop */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-continue */
/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable no-restricted-syntax */

const readPkgUp = require('read-pkg-up');
const ExternalModule = require('webpack/lib/ExternalModule');
const RawSource = require('webpack-sources').RawSource;
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const promisify = require('util').promisify;

const resolvePkg = require('./resolve-pkg');
const getResolver = require('./get-resolver');
const findPackage = require('./find').findPackage;

const readFileAsync = promisify(fs.readFile);
const pluginName = 'dynamic-cdn-webpack-plugin';
let HtmlWebpackPlugin;
try {
	HtmlWebpackPlugin = require('html-webpack-plugin');
} catch {
	HtmlWebpackPlugin = null;
}

function addUnpkgURL(info) {
	info.url = `https://unpkg.com/${info.name}@${info.version}${info.path}`;
}

const moduleRegex = /^((?:@[a-z\d][\w-.]+\/)?[a-z\d][\w-.]*)/;
const MODULE_WITHOUT_MAIN = [
	'@babel/runtime',
	'babel-runtime',
	'@babel/runtime-corejs2',
	'rc-util',
	'@talend/bootstrap-theme',
	'indexof',
	'@types/js-cookie',
];

const getEnvironment = mode => {
	switch (mode) {
		case 'none':
		case 'development':
			return 'development';

		default:
			return 'production';
	}
};

function getDeps(cdnConfig) {
	return Object.keys(cdnConfig).reduce((acc, key) => {
		acc[key] = {
			name: cdnConfig[key].name,
			var: cdnConfig[key].var,
			version: cdnConfig[key].version,
			path: cdnConfig[key].path,
			stylePath: cdnConfig[key].stylePath,
		};
		return acc;
	}, {});
}

function getPackageRootPath(name, contextPath) {
	const main = resolvePkg(name, { cwd: contextPath });

	const depPath = path.normalize(path.join(path.sep, name, path.sep));
	const index = main.indexOf(depPath);
	// index may equal -1:
	// name = @talend/react-cmf
	// main = /Users/jmfrancois/github/talend/ui/packages/cmf/lib/index.js
	if (index !== -1) {
		return main.slice(0, index + depPath.length);
	}
	const pkg = readPkgUp.sync({ cwd: main });
	return path.resolve(pkg.path, '..');
}

async function computeSRI(filePath) {
	if (!fs.existsSync(filePath)) {
		console.error(`ERROR: can not compute SRI of ${filePath}`);
		return '';
	}
	const file = await readFileAsync(filePath, 'utf8');
	const hash = crypto.createHash('sha384').update(file, 'utf8').digest('base64');
	return `sha384-${hash}`;
}

async function moduleJSToMetadata(data, { name, version, path: depPath, url, local: localPath }) {
	const metadata = { name, version, path: url };
	const contextPath = data.context;
	const contextModulePath = findPackage(metadata) || contextPath;

	if (contextModulePath) {
		const depFilePath = path.join(contextModulePath, depPath);
		metadata.integrity = await computeSRI(depFilePath);
	} else if (localPath) {
		metadata.integrity = await computeSRI(localPath);
	}

	return metadata;
}

async function moduleCSSToMetadata(data, { name, version, stylePath, styleUrl }) {
	const metadata = { name, version, path: styleUrl };
	const contextPath = data.context;
	const contextModulePath = findPackage(metadata) || contextPath;
	if (contextModulePath) {
		const styleFilePath = path.join(contextModulePath, stylePath);
		metadata.integrity = await computeSRI(styleFilePath);
	}

	return metadata;
}

class DynamicCdnWebpackPlugin {
	constructor({
		disable = false,
		env,
		exclude,
		only,
		resolver,
		addURL,
		loglevel = 'ERROR',
		verbose,
	} = {}) {
		if (exclude && only) {
			throw new Error("You can't use 'exclude' and 'only' at the same time");
		}

		this.disable = disable;
		this.env = env;
		this.exclude = exclude || [];
		this.only = only || null;
		this.resolver = getResolver(resolver);
		this.addURL = addURL || addUnpkgURL;
		this.loglevel = verbose ? 'DEBUG' : loglevel;

		this.log = (...message) => {
			console.log('\nDynamicCdnWebpackPlugin:', ...message);
		};

		if (this.loglevel === 'ERROR') {
			this.log = () => {};
		}

		this.debug = () => {};
		if (this.loglevel === 'DEBUG') {
			this.debug = (...message) => {
				console.debug('\nDynamicCdnWebpackPlugin:', ...message);
			};
		}

		this.error = (...message) => {
			console.error('\nDynamicCdnWebpackPlugin ERROR:', ...message);
		};

		this.modulesFromCdn = {};
		// Direct dependencies are the dependencies of the produced bundle.
		// Where modulesFromCdn refer to all dependencies needed to make it work.
		this.directDependencies = {};
	}

	apply(compiler) {
		if (!this.disable) {
			this.execute(compiler, {
				env: this.env || getEnvironment(compiler.options.mode),
			});
		}

		const isUsingHtmlWebpackPlugin =
			HtmlWebpackPlugin != null &&
			compiler.options.plugins.some(x => x instanceof HtmlWebpackPlugin);

		this.publicPath = compiler.options.output.publicPath;
		if (isUsingHtmlWebpackPlugin) {
			this.applyHtmlWebpackPlugin(compiler);
		} else {
			this.applyWebpackCore(compiler);
		}
	}

	execute(compiler, { env }) {
		compiler.hooks.normalModuleFactory.tap(pluginName, nmf => {
			nmf.hooks.factory.tap(pluginName, factory => async (data, cb) => {
				const modulePath = data.dependencies[0].request;
				const contextPath = data.context;

				const isModulePath = moduleRegex.test(modulePath);
				if (!isModulePath) {
					return factory(data, cb);
				}

				const varName = await this.addModule(contextPath, modulePath, {
					env,
				});

				if (varName === false) {
					factory(data, cb);
				} else if (varName == null) {
					cb(null, new ExternalModule('{}', 'var', modulePath));
				} else {
					cb(null, new ExternalModule(varName, 'var', modulePath));
				}
			});
		});
	}

	/**
	 * addDependencies is like addModule but with shortcut.
	 * The goal is to not rely on moduleToCdn here but trust the manifest
	 * @param {string} contextPath the path from where to work
	 * @param {object} manifest dependencies.json result from a build
	 * @param {object} options with env property in it
	 */
	addDependencies(contextPath, manifest, { env, requester }) {
		for (const dependencyName of Object.keys(manifest)) {
			const cdnConfig = manifest[dependencyName];
			const cwd = resolvePkg(cdnConfig.name, { cwd: contextPath });
			if (!cwd) {
				this.error(
					'\n❌',
					cdnConfig.name,
					"addDependencies() couldn't load this lib because it has not been found by require.resolve",
				);
				continue;
			}
			const pkg = readPkgUp.sync({ cwd });
			const installedVersion = pkg.packageJson.version;
			cdnConfig.version = installedVersion;
			cdnConfig.local = path.resolve(
				pkg.path,
				'..',
				path.normalize(cdnConfig.path).replace(path.sep, ''),
			);
			this.addURL(cdnConfig, { env, publicPath: this.publicPath });
			if (this.modulesFromCdn[dependencyName]) {
				const alreadyAddedVersion = this.modulesFromCdn[dependencyName].version;
				if (alreadyAddedVersion !== installedVersion) {
					throw new Error(
						`https://github.com/Talend/ui-scripts/wiki/DEPENDENCY_ERROR_01: ${dependencyName} from manifest is already loaded in
                        ${alreadyAddedVersion} but need ${installedVersion}.`,
					);
				}
				continue;
			}
			const contextModulePath =
				getPackageRootPath(cdnConfig.name, contextPath) || contextPath;
			const depPath = `${path.join(contextModulePath, cdnConfig.path)}.dependencies.json`;
			if (fs.existsSync(depPath)) {
				this.addDependencies(contextModulePath, require(depPath), {
					env,
					requester: cdnConfig.name,
				});
			}
			this.debug(
				'\n✅',
				cdnConfig.name,
				cdnConfig.version,
				`dependency will be served by ${cdnConfig.url}, requester: ${requester}`,
			);
			this.modulesFromCdn[dependencyName] = cdnConfig;
			this.modulesFromCdn[dependencyName].local = path.join(
				contextModulePath,
				cdnConfig.path,
			);
		}
	}

	async addModule(contextPath, modulePath, { env, isOptional = false }) {
		const isModuleExcluded =
			this.exclude.includes(modulePath) || (this.only && !this.only.includes(modulePath));
		if (isModuleExcluded) {
			return false;
		}
		const moduleName = modulePath.match(moduleRegex)[1];
		const cwd = resolvePkg(modulePath, { cwd: contextPath });
		if (!cwd) {
			if (!isOptional && MODULE_WITHOUT_MAIN.indexOf(moduleName) === -1) {
				this.error(
					'\n❌',
					modulePath,
					"couldn't be loaded because it is not found by require.resolve",
				);
			}
			return false;
		}

		// in some cases, the imported module can be a sub module in a lib, that has its own package.json
		// if those sub modules do not have a valid name, this plugin fails because readPkgUp check the validity
		// the case exists for @apollo/client for example. It contains sub modules like `@apollo/client/link/context` that is not a valid name but has a package.json with this name
		// let's skip those sub libraries, and embed them in the resulting bundle as they are not exposed in the main index of the lib.
		let readPkgJsonResult;
		try {
			readPkgJsonResult = readPkgUp.sync({ cwd }).packageJson;
		} catch (e) {
			return false;
		}

		const { version, peerDependencies, peerDependenciesMeta, dependencies } = readPkgJsonResult;

		const isModuleAlreadyLoaded = Boolean(this.modulesFromCdn[modulePath]);
		if (isModuleAlreadyLoaded) {
			const isSameVersion = this.modulesFromCdn[modulePath].version === version;
			if (isSameVersion) {
				// the dep module has already been added. This comes form a manifest (it's a dep of a dep)
				// now we find it in our code as direct import, this means that this module is also a direct dependency
				// we add it in the "directDependencies" array to insert it in this project's manifest
				if (!this.directDependencies[modulePath]) {
					this.directDependencies[modulePath] = this.modulesFromCdn[modulePath];
				}
				return this.modulesFromCdn[modulePath].var;
			}

			this.log(
				'\n‼️',
				modulePath,
				version,
				'is already loaded in another version. you have this deps twice',
			);
			return false;
		}
		const cdnConfig = await this.resolver(modulePath, version, {
			env,
			publicPath: this.publicPath,
		});

		if (cdnConfig == null) {
			this.debug(
				'\n❔',
				modulePath,
				version,
				"couldn't be found, if you want it you can add it to your resolver.",
			);
			return false;
		}

		// Try to get the manifest
		const contextModulePath = getPackageRootPath(cdnConfig.name, contextPath) || contextPath;
		const depPath = `${path.join(contextModulePath, cdnConfig.path)}.dependencies.json`;
		cdnConfig.local = path.join(contextModulePath, cdnConfig.path);

		if (fs.existsSync(depPath)) {
			this.log('\n📚', depPath, "is found, let's embed the provided dependencies");
			this.addDependencies(contextModulePath, require(depPath), {
				env,
				requester: cdnConfig.name,
			});
		} else {
			if (dependencies) {
				for (const dependencyName of Object.keys(dependencies)) {
					await this.addModule(contextModulePath, dependencyName, {
						env,
					});
				}
			}

			if (peerDependencies) {
				const enhancedPeer = { ...peerDependencies, ...peerDependenciesMeta };
				const arePeerDependenciesLoaded = (
					await Promise.all(
						Object.keys(enhancedPeer).map(peerDependencyName => {
							const peerMeta =
								peerDependenciesMeta && peerDependenciesMeta[peerDependencyName];
							const peerIsOptional = peerMeta && peerMeta.optional;
							const result = this.addModule(contextPath, peerDependencyName, {
								env,
								isOptional: peerIsOptional,
							});
							return result.then(found => {
								if (!found && !peerIsOptional) {
									this.error(
										'\n❌',
										modulePath,
										version,
										"couldn't be loaded because peer dependency is missing",
										peerDependencyName,
										contextPath,
									);
								}

								return peerIsOptional || found;
							});
						}),
					)
				).every(result => Boolean(result));

				if (!arePeerDependenciesLoaded) {
					return false;
				}
			}
		}

		this.modulesFromCdn[modulePath] = cdnConfig;
		this.directDependencies[modulePath] = cdnConfig;
		this.debug('\n✅', modulePath, version, `will be served by ${cdnConfig.url}`);
		return cdnConfig.var;
	}

	applyWebpackCore(compiler) {
		compiler.hooks.afterCompile.tapAsync(pluginName, (compilation, cb) => {
			for (const [name, cdnConfig] of Object.entries(this.modulesFromCdn)) {
				compilation.addChunkInGroup(name);
				const chunk = compilation.addChunk(name);
				chunk.files.push(cdnConfig.url);
			}

			cb();
		});
		compiler.hooks.emit.tapAsync(pluginName, (compilation, cb) => {
			if (!compiler.options.output.filename.includes('[')) {
				const depName = `${compiler.options.output.filename}.dependencies.json`;
				compilation.assets[depName] = new RawSource(
					JSON.stringify(getDeps(this.directDependencies)),
				);
			}
			cb();
		});
	}

	applyHtmlWebpackPlugin(compiler) {
		compiler.hooks.compilation.tap(pluginName, compilation => {
			// Static Plugin interface |compilation |HOOK NAME | register listener
			const alterAssets = (data, cb) => {
				const jsMetadataPromise = Promise.all(
					Object.values(this.modulesFromCdn)
						.map(module => moduleJSToMetadata(data, module))
						.filter(meta => meta),
				);
				const cssMetadataPromise = Promise.all(
					Object.values(this.modulesFromCdn)
						.filter(({ styleUrl }) => styleUrl)
						.map(module => moduleCSSToMetadata(data, module))
						.filter(meta => meta),
				);

				Promise.all([jsMetadataPromise, cssMetadataPromise]).then(
					([jsMetadataWithSRI, cssMetadataWithSRI]) => {
						// js files: add the cdn assets metadata + app bundle urls
						data.assets.jsMetadata = jsMetadataWithSRI.concat(data.assets.js);
						// css files: add the cdn assets metadata + app bundle urls
						data.assets.cssMetadata = cssMetadataWithSRI.concat(data.assets.css);

						// css files: add cdn assets urls before the app bundle assets
						const cdnCssAssets = Object.values(this.modulesFromCdn)
							.map(moduleFromCdn => moduleFromCdn.styleUrl)
							.filter(Boolean);

						data.assets.css = [].concat(cdnCssAssets, data.assets.css);

						// js files: add cdn assets urls before the app bundle assets
						const cdnJsAssets = Object.values(this.modulesFromCdn)
							.map(moduleFromCdn => moduleFromCdn.url)
							.filter(Boolean);
						data.assets.js = [].concat(cdnJsAssets, data.assets.js);

						// Tell webpack to move on
						if (cb) {
							cb(null, data);
						}
					},
				);

				return data;
			};

			if (HtmlWebpackPlugin.getHooks) {
				HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
					pluginName,
					alterAssets,
				);
			} else if (
				compilation.hooks &&
				compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration
			) {
				compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration.tapAsync(
					pluginName,
					alterAssets,
				);
			} else {
				throw new Error(
					'@talend/dynamic-cdn-webpack-plugin support only webpack-html-plugin 3.2 and 4.x',
				);
			}
		});
	}
}

module.exports = { default: DynamicCdnWebpackPlugin };
