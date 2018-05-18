/* eslint-disable global-require */
const path = require('path');
const mergeSettings = require('@talend/react-cmf/scripts/cmf-settings.merge');
const get = require('lodash/get');

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
	this.options = Object.assign(
		{
			quiet: false,
			watch: false,
		},
		options,
	);
	this.log = (...args) => {
		if (!this.options.quiet) {
			console.error('[ReactCMFWebpackPlugin]', ...args); // eslint-disable-line no-console
		}
	};
}

ReactCMFWebpackPlugin.prototype.apply = function reactCMFWebpackPluginApply(compiler) {
	this.log('apply');

	// adapt cmf settings result to output to /settings.json by default
	const outputPath = get(compiler.options, ['devServer', 'outputPath'], compiler.options.output.path);
	const cmfConfig = require(path.join(process.cwd(), 'cmf.json'));
	const destination = cmfConfig.settings.destination;
	if (!destination) {
		cmfConfig.settings.destination = path.join(outputPath, 'settings.json');
	}
	this.options.cmfConfig = cmfConfig;

	/**
	 * Runs at each webpack run.
	 * Calls cmf merge function with the modified cmf config.
	 */
	function emit(compilation, callback) {
		this.log(
			'emit',
			JSON.stringify({ canRun: this.canRun, lastRun: this.lastRun, lastWatch: this.lastWatch }),
		);
		if (!this.canRun || (this.lastRun && this.lastWatch && this.lastRun > this.lastWatch)) return;

		const startTime = Date.now();
		this.lastRun = startTime;
		this.canRun = false;

		this.modifiedFiles = mergeSettings(this.options, callback);

		const endTime = Date.now();
		this.log(`Files merged in ${((endTime - startTime) % 60000) / 1000}s`);
		this.canRun = true;

		callback();
	}

	/**
	 * Register the cmf settings files in the watched files.
	 * So every change will trigger a new webpack run.
	 */
	function afterEmit(compilation, callback) {
		let compilationFileDependencies;
		if (Array.isArray(compilation.fileDependencies)) {
			compilationFileDependencies = new Set(compilation.fileDependencies);
		} else {
			compilationFileDependencies = compilation.fileDependencies;
		}

		this.modifiedFiles
			.filter(file => !compilationFileDependencies.has(file))
			.forEach(file => compilation.fileDependencies.add(file));

		callback();
	}

	const plugin = { name: 'ReactCMFPlugin' };
	compiler.hooks.emit.tapAsync(plugin, emit.bind(this));

	if (this.options.watch) {
		compiler.hooks.afterEmit.tapAsync(plugin, afterEmit.bind(this));
	}
};

module.exports = ReactCMFWebpackPlugin;
