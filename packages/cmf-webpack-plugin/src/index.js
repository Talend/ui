const chokidar = require('chokidar');

const mergeSettings = require('@talend/react-cmf/scripts/cmf-settings.merge');

const chokidarOptions = {
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
};

/**
 * React CMF Webpack Plugin
 * @param options Plugin options
 * @constructor
 */
function ReactCMFWebpackPlugin(options = {}) {
	this._lastRun;
	this._lastWatch;
	this._modifiedFiles = [];
	this._options = Object.assign({
		quiet: false,
		watch: false,
	}, options);
	this._log = (...args) => {
		if (!this._options.quiet) {
			console.error('[ReactCMFWebpackPlugin]', ...args); // eslint-disable-line no-console
		}
	}
}

ReactCMFWebpackPlugin.prototype.apply = function (compiler) {
	this._log('apply');

	compiler.plugin('emit', (compilation, callback) => {
		this._log('emit', { lastRun: this._lastRun, lastWatch: this._lastWatch });
		if (this._lastRun && this._lastWatch && this._lastRun > this._lastWatch) return;
		this._lastRun = new Date();
		const startTime = Date.now();
		this._modifiedFiles = mergeSettings(this._options, this._log, () => {
			const endTime = Date.now();
			this._log(`Files merged in ${(((endTime - startTime) % 60000) / 1000)}s`);
			callback();
		}, callback);
	});

	if (this._options.watch) {
		compiler.plugin('done', () => {
			this._log('done', { lastRun: this._lastRun, lastWatch: this._lastWatch });
			if (this._lastRun && this._lastWatch && this._lastWatch > this._lastRun) return;
			this._lastWatch = new Date();
			const watcher = chokidar.watch(this._modifiedFiles, chokidarOptions);
			const run = () => {
				compiler.run(err => {
					if (err) throw err;
					watcher.close();
				});
			};
			watcher
				.on(
					'add',
					path => {
						this._log(`[watcher] File ${path} has been added`);
					}
				)
				.on(
					'change',
					path => {
						this._log(`[watcher] File ${path} has been changed`);
						run();
					}
				)
				.on(
					'unlink',
					path => {
						this._log(`[watcher] File ${path} has been removed`);
					}
				)
				.on(
					'addDir',
					path => {
						this._log(`[watcher] Directory ${path} has been added`);
					}
				)
				.on(
					'unlinkDir',
					path => {
						this._log(`[watcher] Directory ${path} has been removed`);
					}
				)
				.on(
					'error',
					error => {
						this._log(`[watcher] ${error}`);
					}
				)
				.on(
					'ready',
					() => {
						this._log('[watcher] Initial scan complete. Ready for changes');
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
