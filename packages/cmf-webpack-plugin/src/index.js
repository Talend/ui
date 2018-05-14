/* eslint-disable global-require */
const path = require('path');
const mergeSettings = require('@talend/react-cmf/scripts/cmf-settings.merge');

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

	let outputPath = compiler.options.output.path;
	if (compiler.options.devServer &&
		compiler.options.devServer.outputPath) {
		outputPath = compiler.options.devServer.outputPath;
	}
	const cmfConfig = require(path.join(process.cwd(), 'cmf.json'));
	const destination = cmfConfig.settings.destination;
	if (!destination) {
		cmfConfig.settings.destination = path.join(outputPath, 'settings.json');
	}
	this.options.cmfConfig = cmfConfig;

	const emit = (compilation, callback) => {
		this.log('emit', JSON.stringify({ canRun: this.canRun, lastRun: this.lastRun, lastWatch: this.lastWatch }));
		if (!this.canRun || (this.lastRun && this.lastWatch && this.lastRun > this.lastWatch)) return;

		const startTime = Date.now();
		this.lastRun = startTime;
		this.canRun = false;

		this.modifiedFiles = mergeSettings(this.options, callback);

		const endTime = Date.now();
		this.log(`Files merged in ${(((endTime - startTime) % 60000) / 1000)}s`);
		this.canRun = true;

		callback();
	};

	const plugin = { name: 'ReactCMFPlugin' };
	compiler.hooks.emit.tapAsync(plugin, emit);

	if (this.options.watch) {
		const afterEmit = (compilation, callback) => {
			let compilationFileDependencies;
			if (Array.isArray(compilation.fileDependencies)) {
				compilationFileDependencies = new Set(compilation.fileDependencies);
			} else {
				compilationFileDependencies = compilation.fileDependencies;
			}

			for (const file of this.modifiedFiles) {
				if (!compilationFileDependencies.has(file)) {
					compilation.fileDependencies.add(file);
				}
			}

			callback();
		};

		compiler.hooks.afterEmit.tapAsync(plugin, afterEmit);
	}
};

module.exports = ReactCMFWebpackPlugin;
