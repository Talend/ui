/* eslint-disable global-require */
const path = require('path');
const mergeSettings = require('@talend/scripts-cmf/cmf-settings.merge');
const RawSource = require('webpack-sources').RawSource;

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
	this.options = {
		quiet: false,
		watch: false,
		...options,
	};
	this.log = (...args) => {
		if (!this.options.quiet) {
			console.error('[ReactCMFWebpackPlugin]', ...args); // eslint-disable-line no-console
		}
	};
}

function getCmfconfig(cmfconfigPath) {
	const cmfconfig = require(cmfconfigPath); // eslint-disable-line import/no-dynamic-require
	if (process.env.CMF_ENV) {
		return cmfconfig[process.env.CMF_ENV];
	}
	return cmfconfig;
}

ReactCMFWebpackPlugin.prototype.apply = function reactCMFWebpackPluginApply(compiler) {
	this.log('apply');

	// adapt cmf settings result to output to /settings.json by default
	const outputPath = compiler.options.output.path || path.join(process.cwd(), 'dist');
	const cmfconfigPath = path.join(process.cwd(), 'cmf.json');
	const cmfconfig = getCmfconfig(cmfconfigPath);
	const destination = cmfconfig.settings.destination;
	if (!destination) {
		cmfconfig.settings.destination = path.join(outputPath, 'settings.json');
	}
	this.options.cmfConfig = cmfconfig;

	/**
	 * Runs at each webpack run.
	 * Calls cmf merge function with the modified cmf config.
	 */
	function generateCMFSettings(compilation, callback) {
		this.log(
			'emit',
			JSON.stringify({ canRun: this.canRun, lastRun: this.lastRun, lastWatch: this.lastWatch }),
		);
		if (!this.canRun || (this.lastRun && this.lastWatch && this.lastRun > this.lastWatch)) return;

		const startTime = Date.now();
		this.lastRun = startTime;
		this.canRun = false;

		this.mergedSettingsObjects = mergeSettings(this.options, () => {}, false);

		this.mergedSettingsObjects.destination.forEach(obj => {
			compilation.emitAsset(path.basename(obj.path), new RawSource(JSON.stringify(obj.content)));
		});
		this.mergedSettingsObjects.sources.forEach(filename => {
			compilation.fileDependencies.add(filename);
		});

		const endTime = Date.now();
		this.log(`Files merged in ${((endTime - startTime) % 60000) / 1000}s`);
		this.canRun = true;
	}

	const plugin = { name: 'ReactCMFPlugin' };
	compiler.hooks.thisCompilation.tap(plugin, generateCMFSettings.bind(this));
};

module.exports = ReactCMFWebpackPlugin;
