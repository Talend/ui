const getLinkedLibs = require('./getLinkedLibs');
const convertRequests = require('./convertRequests');
const addAliases = require('./addAliases');

class LocalLibsWebpackPlugin {
	constructor(options) {
		this.linkedLibs = getLinkedLibs(
			Object.entries(options)
				.filter(([packageJsonPath, enabled]) => enabled === true)
				.map(([packageJsonPath]) => packageJsonPath),
		);
	}

	apply(compiler) {
		if (!this.linkedLibs.length) {
			return;
		}

		if (!compiler.options.resolve) {
			compiler.options.resolve = {};
		}

		if (!compiler.options.resolve.alias) {
			compiler.options.resolve.alias = {};
		}

		// eslint-disable-next-line no-param-reassign
		compiler.options.resolve.alias = addAliases(this.linkedLibs, compiler.options.resolve.alias);

		// Look in webpack repo (NormalModuleReplacementPlugin) how to convert to webpack 4 when needed
		// This plugin is necessary to handle all special imports, for example long import paths or imports from inside a linked lib
		compiler.plugin('normal-module-factory', nmf => {
			nmf.plugin('before-resolve', (result, callback) => {
				if (!result) {
					return callback();
				}
				result.request = convertRequests(result.request, this.linkedLibs);
				return callback(null, result);
			});
		});

		console.log('LocalLibsWebpackPlugin: Link the following libs:'); // eslint-disable-line no-console
		Object.keys(compiler.options.resolve.alias).forEach(
			item => console.log(`Link "${item}" to: "${compiler.options.resolve.alias[item]}"`), // eslint-disable-line no-console
		);
	}
}

module.exports = LocalLibsWebpackPlugin;
