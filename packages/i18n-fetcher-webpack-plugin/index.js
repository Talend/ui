const fs = require('fs');
const path = require('path');

// const fromGithub = require('@talend/scripts/internationalization/scripts/from-github');
const fromGithub = require('../scripts/internationalization/scripts/from-github');

function resolveDependencyVersion(dependency) {
	// TODO fetch in pom
	// const pomXmlPath = path.join(process.cwd(), 'pom.xml');
	const packageJsonPath = path.join(process.cwd(), 'package.json');

	let depRawVersion;
	if (fs.existsSync(packageJsonPath)) {
		const packageJson = require(packageJsonPath);

		depRawVersion =
			(packageJson.dependencies && packageJson.dependencies[dependency]) ||
			(packageJson.devDependencies && packageJson.devDependencies[dependency]) ||
			(packageJson.peerDependencies && packageJson.peerDependencies[dependency]);
	}

	if (!depRawVersion) {
		console.warn(`I18n fetcher : dependency ${dependency} not found, no version can be extracted.`);
		return '';
	}
	const VERSION_REGEX = /^[^0-9]*([0-9]+\.[0-9]+).*/;
	const match = depRawVersion.match(VERSION_REGEX);
	return match[1];
}

function resolveVersion({ dependency }) {
	if (dependency) {
		return resolveDependencyVersion(dependency);
	}
	// TODO else get project version
	return null;
}

module.exports = class I18nPlugin {
	constructor(options = {}) {
		this.options = options;
	}

	apply(compiler) {
		const { files, debug } = this.options;
		const output = compiler.options.output.path;

		const resources = files.map(conf => ({
			url: conf.url,
			project: conf.project,
			target: path.join(output, conf.target),
			version: resolveVersion(conf),
		}));

		function logDebug(message) {
			if (debug) {
				console.log(message);
			}
		}

		function emit(compilation, callback) {
			logDebug('Copy', JSON.stringify(files, null, 2), output);

			logDebug('I18n fetcher : Starting emit');
			return fromGithub({ resources })
				.catch(err => {
					console.error('I18n fetcher : process fail', err);
					compilation.errors.push(err);
				})
				.then(() => {
					logDebug('I18n fetcher : Finishing emit');
					callback();
				});
		}

		if (compiler.hooks) {
			const plugin = { name: 'I18nFetcher' };

			compiler.hooks.emit.tapAsync(plugin, emit);
		} else {
			compiler.plugin('emit', emit);
		}
	}
};
