const getLinkedLibs = require('./getLinkedLibs');
const convertRequest = require('./convertRequest');
const addAliases = require('./addAliases');

class LocalLibsWebpackPlugin {
	constructor(options) {
		this.linkedLibs = getLinkedLibs(
			Object.entries(options)
				// eslint-disable-next-line no-unused-vars
				.filter(([packageJsonPath, enabled]) => enabled === true)
				.map(([packageJsonPath]) => packageJsonPath),
		);
	}

	apply(compiler) {
		if (!this.linkedLibs.length) {
			return;
		}

		// eslint-disable-next-line no-param-reassign
		compiler.options.resolve = compiler.options.resolve || {};

		// eslint-disable-next-line no-param-reassign
		compiler.options.resolve.alias = addAliases(this.linkedLibs, compiler.options.resolve.alias);

		// Look in webpack repo (NormalModuleReplacementPlugin) how to convert to webpack 4 when needed
		// This plugin is necessary to handle all special imports,
		// for example long import paths or imports from inside a linked lib
		compiler.plugin('normal-module-factory', nmf => {
			nmf.plugin('before-resolve', (result, callback) => {
				if (!result) {
					return callback();
				}
				// eslint-disable-next-line no-param-reassign
				result.request = convertRequest(result.request, this.linkedLibs);
				return callback(null, result);
			});
		});
	}
}

module.exports = LocalLibsWebpackPlugin;
