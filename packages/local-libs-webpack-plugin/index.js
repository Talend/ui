const formatOptions = require('./lib/formatOptions');
const getLinkedLibs = require('./lib/getLinkedLibs');
const ensureOptionsKeys = require('./lib/ensureOptionsKeys');
const addAliases = require('./lib/addAliases');
const convertRequests = require('./lib/convertRequests');

class LocalLibsWebpackPlugin {
	constructor(options) {
		this.options = formatOptions(options);
	}

	apply(compiler) {
		const linkedLibs = getLinkedLibs(this.options);
		if (!linkedLibs.length) {
			return;
		}

		/* eslint-disable no-param-reassign */
		compiler.options = ensureOptionsKeys(compiler.options);
		compiler.options.resolve.alias = addAliases(linkedLibs, compiler.options.resolve.alias);
		/* eslint-enable no-param-reassign */

		// Look in webpack repo (NormalModuleReplacementPlugin) how to convert to webpack 4 when needed
		// This plugin is necessary to handle all special imports, for example long import paths or imports from inside a linked lib
		compiler.plugin('normal-module-factory', nmf => {
			nmf.plugin('before-resolve', (result, callback) => {
				if (!result) {
					return callback();
				}
				result.request = convertRequests(result.request, result.context, linkedLibs);
				return callback(null, result);
			});
		});

		console.log('LocalLibsWebpackPlugin: Link the following libs:'); // eslint-disable-line no-console
		Object.keys(compiler.options.resolve.alias).forEach(item => (
			console.log(`Link "${item}" to: "${compiler.options.resolve.alias[item]}"`) // eslint-disable-line no-console
		));
	}
}

module.exports = LocalLibsWebpackPlugin;
