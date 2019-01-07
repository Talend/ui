const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const request = require('request');
const Zip = require('adm-zip');
const rimraf = require('rimraf');

function getDependencyVersion(dependency = '') {
	const packageJsonPath = path.join(process.cwd(), 'package.json');
	const packageJson = require(packageJsonPath);

	const depRawVersion =
		(packageJson.dependencies && packageJson.dependencies[dependency]) ||
		(packageJson.devDependencies && packageJson.devDependencies[dependency]) ||
		(packageJson.peerDependencies && packageJson.peerDependencies[dependency]);

	if (!depRawVersion) {
		console.warn(`I18n fetcher : dependency ${dependency} not found, no version can be extracted.`);
		return '';
	}

	const VERSION_REGEX = /^[^0-9]*([0-9]+\.[0-9]+).*/;
	const match = depRawVersion.match(VERSION_REGEX);
	return match[1];
}

function resolveUrl(urlPattern, conf) {
	let url = urlPattern;
	if (urlPattern.includes('{version}') && conf.dependency) {
		const version = getDependencyVersion(conf.dependency);
		url = url.replace('{version}', version);
	}
	if (urlPattern.includes('{project}') && conf.project) {
		url = url.replace('{project}', conf.project);
	}

	return url;
}

module.exports = class I18nPlugin {
	constructor(options = {}) {
		this.options = options;
	}

	apply(compiler) {
		const { urlPattern, files, debug } = this.options;
		const output = compiler.options.output.path;

		function logDebug(message) {
			if (debug) {
				console.log(message);
			}
		}

		function emit(compilation, callback) {
			logDebug('Copy', JSON.stringify(files, null, 2), output);

			const promises = files
				.map((conf, index) => {
					const { target, url } = conf;
					const filesUrl = url || resolveUrl(urlPattern, conf);
					if (!filesUrl) {
						console.error(
							'I18n fetcher : Please check following configuration',
							JSON.stringify(conf, null, 2),
						);
						return null;
					}
					logDebug(`Let's download ${filesUrl}`);

					const targetPath = path.join(output, target);
					mkdirp.sync(targetPath);
					const zipPath = path.join(targetPath, `${index}.zip`);

					return new Promise((resolve, reject) => {
						request(filesUrl)
							.on('error', err => {
								reject(err);
							})
							.pipe(fs.createWriteStream(zipPath, { autoClose: true }))
							.on('close', () => {
								resolve();
							});
					})
						.then(() =>
							logDebug(`I18n fetcher : Files downloaded from ${filesUrl} to ${targetPath}`),
						)
						.then(() => {
							logDebug(`I18n fetcher : Extracting ${zipPath} to ${targetPath}`);
							const zip = new Zip(zipPath);
							zip.extractAllTo(targetPath, true);
							rimraf.sync(zipPath);
							logDebug('I18n fetcher : Extract done');
						})
						.catch(err => {
							console.error('I18n fetcher : process fail', err);
						});
				})
				.filter(p => p);

			logDebug('I18n fetcher : Starting emit');
			Promise.all(promises)
				.catch(err => {
					compilation.errors.push(err);
				})
				.then(() => {
					logDebug('I18n fetcher : Finishing emit');
					callback();
				})
				.catch(err => console.error(err));
		}

		if (compiler.hooks) {
			const plugin = { name: 'I18nFetcher' };

			compiler.hooks.emit.tapAsync(plugin, emit);
		} else {
			compiler.plugin('emit', emit);
		}
	}
};
