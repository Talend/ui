const chokidar = require('chokidar');

const mergeSettings = require('@talend/react-cmf/scripts/cmf-settings.merge');

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
		quiet,
		watch,
	} = Object.assign({
		quiet: false,
		watch: false,
	}, this.options);

	let modifiedFiles;

	function log(message) {
		if (!quiet) {
			console.error(message); // eslint-disable-line no-console
		}
	}

	compiler.plugin('emit', (compilation, callback) => {
		modifiedFiles = mergeSettings(this.options, callback);
		callback();
	});

	if (watch) {
		compiler.plugin('done', () => {
			const watcher = chokidar.watch(modifiedFiles, {
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
						log(`Compilation started after change of - ${path}`);
						compiler.run(err => {
							if (err) throw err;
							watcher.close();
						});
						log(`Compilation ended for change of - ${path}`);
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
