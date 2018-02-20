const fs = require('fs');
const pathLib = require('path');
const mkdirp = require('mkdirp');
const deepmerge = require('deepmerge');

/**
 * React CMF Webpack Plugin
 * @param options Plugin options
 * @constructor
 */
function ReactCMFWebpackPlugin(options = {}) {
	this.options = options;
}

ReactCMFWebpackPlugin.prototype.apply = function(compiler) {
	const {
		dev,
		quiet,
		recursive,
	} = this.options;

	compiler.plugin('emit', function(compilation, callback) {
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

		function log() {
			return somethingToLog => {
				if (!quiet) {
					console.error(somethingToLog);
				}
			};
		}

		const cmfconfig = (() => {
			try {
				return require(pathLib.join(process.cwd(), 'cmf.json')); // eslint-disable-line
			} catch (e) {
				console.error('cmf.json file is required to run this script');
				process.exit();
			}
			return null;
		})();

		const sources = dev ? cmfconfig.settings['sources-dev'] : cmfconfig.settings.sources;
		const destination = pathLib.join(process.cwd(), cmfconfig.settings.destination);

		log('\nExtracting configuration from : \n');

		const jsonFiles = sources.reduce(
			(acc, source) => acc.concat([...findJson(pathLib.join(process.cwd(), source), recursive)]),
			[],
		);

		log(jsonFiles);

		log('\n');

		const configurations = jsonFiles.map(path => require(`${path}`)); // eslint-disable-line global-require

		const settings = deepmerge.all(configurations, { arrayMerge: concatMerge });

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
};

module.exports = ReactCMFWebpackPlugin;
