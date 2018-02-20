const fs = require('fs');
const pathLib = require('path');
const mkdirp = require('mkdirp');

const chokidar = require('chokidar');
const deepmerge = require('deepmerge');

const defaultExt = '.json';
const defaultConfigFilename = 'cmf.json';

/**
 * React CMF Webpack Plugin
 * @param options Plugin options
 * @constructor
 */
function ReactCMFWebpackPlugin(options = {}) {
	this.options = options;
}

ReactCMFWebpackPlugin.prototype.apply = compiler => {
	const {
		dev,
		quiet,
		recursive,
		watch,
	} = Object.assign({
		dev: false,
		quiet: false,
		recursive: false,
		watch: false,
	}, this.options);

	const log = !quiet && console.error; // eslint-disable-line no-console

	let files;

	function findJson(fileOrFolder) {
		let jsonFiles = [];
		if (fileOrFolder.endsWith(defaultExt)) {
			jsonFiles.push(fileOrFolder);
		} else {
			fs.readdirSync(fileOrFolder).forEach(path => {
				const fullpath = pathLib.join(fileOrFolder, path);
				if (path.endsWith(defaultExt)) {
					jsonFiles.push(fullpath);
				} else if (recursive && fs.lstatSync(fullpath).isDirectory()) {
					jsonFiles = jsonFiles.concat(...findJson(fullpath));
				}
			});
		}
		return jsonFiles;
	}

	function concatMerge(destinationArray, sourceArray) {
		return destinationArray.concat(sourceArray);
	}

	function getChildRoutes(splitedPath, settings) {
		let currentChild = settings.routes.childRoutes;
		splitedPath.forEach(path => {
			if (path !== '') {
				currentChild.forEach(config => {
					if (config.path === path) {
						currentChild = config.childRoutes || [];
					}
				});
			}
		});
		return currentChild;
	}

	function overrideRoutes(path, settings) {
		const childRoutes = getChildRoutes(path.split('/'), settings);
		settings.overrideRoutes[path].forEach(config => {
			childRoutes.push(config);
		});
		delete settings.overrideRoutes[path]; // eslint-disable-line no-param-reassign
	}

	function overrideActions(id, settings) {
		// eslint-disable-next-line no-param-reassign
		settings.actions[id] = Object.assign({}, settings.actions[id], settings.overrideActions[id]);
	}

	compiler.plugin('emit', (compilation, callback) => {
		let cmfconfig = {};
		try {
			const cmfconfigPath = pathLib.join(process.cwd(), defaultConfigFilename);
			delete require.cache[require.resolve(cmfconfigPath)];
			cmfconfig = require(cmfconfigPath); // eslint-disable-line global-require
		} catch (e) {
			log(`${defaultConfigFilename} file is required to run this script`);
			process.exit();
		}

		const sources = dev ? cmfconfig.settings['sources-dev'] : cmfconfig.settings.sources;

		const destination = pathLib.join(process.cwd(), cmfconfig.settings.destination);

		files = sources.reduce(
			(acc, source) => acc.concat([...findJson(pathLib.join(process.cwd(), source))]),
			[],
		);

		log('Extracting configuration from:', files);

		const configurations = files.map(jsonFilePath => {
			delete require.cache[require.resolve(jsonFilePath)];
			return require(jsonFilePath); // eslint-disable-line global-require
		});

		const settings = deepmerge.all(configurations, {
			arrayMerge: concatMerge,
		});

		if (settings.overrideRoutes) {
			Object.keys(settings.overrideRoutes).forEach(route => {
				overrideRoutes(route, settings);
			});
		}
		if (settings.overrideActions) {
			Object.keys(settings.overrideActions).forEach(id => {
				overrideActions(id, settings);
			});
		}

		log(`Merge to ${destination}`);
		mkdirp(pathLib.dirname(destination), () => {
			fs.writeFile(destination, JSON.stringify(settings), () => {
				log('Merged');
			});
		});

		callback();
	});

	if (watch) {
		compiler.plugin('done', () => {
			const watcher = chokidar.watch(files, {
				persistent: true,
				ignored: false,
				ignoreInitial: false,
				followSymlinks: true,
				cwd: '.',
				disableGlobbing: false,
				usePolling: true,
				interval: 100,
				binaryInterval: 300,
				alwaysStat: false,
				depth: 99,
				awaitWriteFinish: {
					stabilityThreshold: 2000,
					pollInterval: 100,
				},
				ignorePermissionErrors: false,
				atomic: true,
			});

			watcher
				.on(
					'add',
					() => null
				)
				.on(
					'change',
					path => {
						log(`\n\n Compilation Started  after change of - ${path} \n\n`);
						compiler.run(err => {
							if (err) throw err;
							watcher.close();
						});
						log(`\n\n Compilation ended  for change of - ${path} \n\n`);
					}
				)
				.on(
					'unlink',
					path => {
						log(`File ${path} has been removed`);
					}
				)
				.on(
					'addDir',
					path => {
						log(`Directory ${path} has been added`);
					}
				)
				.on(
					'unlinkDir',
					path => {
						log(`Directory ${path} has been removed`);
					}
				)
				.on(
					'error',
					error => {
						log(`Watcher error: ${error}`);
					}
				)
				.on(
					'ready',
					() => {
						log('Initial scan complete. Ready for changes');
					}
				)
				.on(
					'raw',
					() => null
				);
		});
	}
};

module.exports = ReactCMFWebpackPlugin;
