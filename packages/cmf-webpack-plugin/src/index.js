const fs = require('fs');
const pathLib = require('path');
const mkdirp = require('mkdirp');
const chokidar = require('chokidar');
const deepmerge = require('deepmerge');

/**
 * React CMF Webpack Plugin
 * @param options Plugin options
 * @constructor
 */
function ReactCMFWebpackPlugin(options = {}) {
	this.options = options;
}

ReactCMFWebpackPlugin.prototype.apply = function (compiler) {
	const {
		dev,
		quiet,
		recursive,
		watch,
	} = this.options;

	let jsonFiles;

	function findJson(fileOrFolder, recursive) {
		let jsonFiles = [];
		if (fileOrFolder.endsWith('.json')) {
			jsonFiles.push(fileOrFolder);
		} else {
			fs.readdirSync(fileOrFolder).forEach(path => {
				const fullpath = pathLib.join(fileOrFolder, path);
				if (path.endsWith('.json')) {
					jsonFiles.push(fullpath);
				} else if (recursive && fs.lstatSync(fullpath).isDirectory()) {
					jsonFiles = jsonFiles.concat(...findJson(fullpath, recursive));
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

	compiler.plugin('emit', function (compilation, callback) {

		let cmfconfig = {};
		try {
			const cmfconfigPath = pathLib.join(process.cwd(), 'cmf.json');
			delete require.cache[require.resolve(cmfconfigPath)];
			cmfconfig = require(cmfconfigPath); // eslint-disable-line global-require
		} catch (e) {
			console.error('cmf.json file is required to run this script');
			process.exit();
		}

		const sources = dev ? cmfconfig.settings['sources-dev'] : cmfconfig.settings.sources;

		const destination = pathLib.join(process.cwd(), cmfconfig.settings.destination);

		jsonFiles = sources.reduce(
			(acc, source) => acc.concat([...findJson(pathLib.join(process.cwd(), source), recursive)]),
			[],
		);

		console.error('Extracting configuration from:', jsonFiles);

		const configurations = jsonFiles.map(jsonFilePath => {
			delete require.cache[require.resolve(jsonFilePath)];
			return require(jsonFilePath); // eslint-disable-line global-require
		});

		const settings = deepmerge.all(configurations, {arrayMerge: concatMerge});

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

		console.error(`Merge to ${destination}`);
		mkdirp(pathLib.dirname(destination), () => {
			fs.writeFile(destination, JSON.stringify(settings), () => {
				console.error('Merged');
			});
		});

		callback();
	});

	if (watch) {
		compiler.plugin('done', compilation => {
			const watcher = chokidar.watch(jsonFiles, {
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
					pollInterval: 100
				},
				ignorePermissionErrors: false,
				atomic: true
			});

			watcher
				.on(
					'add',
					function (path) {
						return null;
					}
				)
				.on(
					'change',
					function (path) {
						console.error(`\n\n Compilation Started  after change of - ${path} \n\n`);
						compiler.run(function (err) {
							if (err) throw err;
							watcher.close();
						});
						console.error(`\n\n Compilation ended  for change of - ${path} \n\n`);
					}
				)
				.on(
					'unlink',
					function (path) {
						console.error(`File ${path} has been removed`);
					}
				)
				.on(
					'addDir',
					function (path) {
						console.error(`Directory ${path} has been added`);
					}
				)
				.on(
					'unlinkDir',
					function (path) {
						console.error(`Directory ${path} has been removed`);
					}
				)
				.on(
					'error',
					function (error) {
						console.error(`Watcher error: ${error}`);
					}
				)
				.on(
					'ready',
					function () {
						console.error('Initial scan complete. Ready for changes');
					}
				)
				.on(
					'raw',
					function (event, path, details) {
						return null;
					}
				);
		});
	}
};

module.exports = ReactCMFWebpackPlugin;
