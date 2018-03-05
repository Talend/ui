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
	this.canRun = true;
	this.lastRun = null;
	this.lastWatch = null;
	this.modifiedFiles = [];
	this.options = Object.assign({
		quiet: false,
		watch: false,
	}, options);
	this.log = (...args) => {
		if (!this.options.quiet) {
			console.error('[ReactCMFWebpackPlugin]', ...args); // eslint-disable-line no-console
		}
	};
}

ReactCMFWebpackPlugin.prototype.apply = function (compiler) {
	this.log('apply');

	compiler.plugin('emit', (compilation, callback) => {
		this.log('emit', JSON.stringify({ canRun: this.canRun, lastRun: this.lastRun, lastWatch: this.lastWatch }));
		if (!this.canRun || (this.lastRun && this.lastWatch && this.lastRun > this.lastWatch)) return;
		this.canRun = false;
		this.lastRun = new Date();
		const startTime = Date.now();
		this.modifiedFiles = mergeSettings(this.options, this.log, () => {
			const endTime = Date.now();
			this.log(`Files merged in ${(((endTime - startTime) % 60000) / 1000)}s`);
			this.canRun = true;
			callback();
		}, callback);
	});

	if (this.options.watch) {
		compiler.plugin('done', () => {
			this.log('done', JSON.stringify({ canRun: this.canRun, lastRun: this.lastRun, lastWatch: this.lastWatch }));
			if (!this.canRun || (this.lastRun && this.lastWatch && this.lastWatch > this.lastRun)) return;
			this.lastWatch = new Date();
			const watcher = chokidar.watch(this.modifiedFiles, chokidarOptions);
			const run = () => {
				watcher.close();
				compiler.run(err => {
					if (err) throw err;
				});
			};
			watcher
				.on(
					'add',
					path => {
						this.log(`[watcher] File ${path} has been added`);
					}
				)
				.on(
					'change',
					path => {
						this.log(`[watcher] File ${path} has been changed`);
						run();
					}
				)
				.on(
					'unlink',
					path => {
						this.log(`[watcher] File ${path} has been removed`);
					}
				)
				.on(
					'addDir',
					path => {
						this.log(`[watcher] Directory ${path} has been added`);
					}
				)
				.on(
					'unlinkDir',
					path => {
						this.log(`[watcher] Directory ${path} has been removed`);
					}
				)
				.on(
					'error',
					error => {
						this.log(`[watcher] ${error}`);
					}
				)
				.on(
					'ready',
					() => {
						this.log('[watcher] Initial scan complete. Ready for changes');
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
