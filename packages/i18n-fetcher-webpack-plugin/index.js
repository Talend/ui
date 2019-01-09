const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

// const fromGithub = require('@talend/scripts/internationalization/scripts/from-github');
const fromGithub = require('../scripts/internationalization/scripts/from-github');

function resolveDependencyVersion(dependency) {
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

function resolveProjectVersion() {
	const packageJsonPath = path.join(process.cwd(), 'package.json');
	const packageJson = require(packageJsonPath);
	return packageJson.version;
}

function resolveVersion({ dependency }) {
	if (dependency) {
		return resolveDependencyVersion(dependency);
	}

	return resolveProjectVersion();
}

module.exports = class I18nPlugin {
	constructor(options = {}) {
		this.options = options;
	}

	apply(compiler) {
		const { resources, debug, cache = 86400000, target } = this.options;
		const outputPath = compiler.options.output.path;
		const targetPath = path.join(outputPath, target || '');

		function logDebug(...messages) {
			if (debug) {
				console.log(...messages);
			}
		}

		if (
			cache &&
			fs.existsSync(targetPath) &&
			Date.now() - fs.statSync(targetPath).birthtimeMs < cache
		) {
			logDebug(
				'\nI18n fetcher : locales exist and is younger as the cache configuration. No i18n files are fetched.',
				'To force it, disable cache in I18n fetcher webpack configuration, or remove your i18n target folder.\n',
			);
			return;
		}
		rimraf.sync(targetPath);

		const resourcesWithVersion = resources.map(conf => ({
			url: conf.url,
			project: conf.project,
			version: resolveVersion(conf),
		}));

		function emit(compilation, callback) {
			logDebug('I18n fetcher : Starting emit');
			return fromGithub({ resources: resourcesWithVersion, target: targetPath })
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
