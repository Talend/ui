/* eslint-disable global-require,no-console */
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const request = require('request');
const Zip = require('adm-zip');
const mergeDirs = require('merge-dirs').default;
const templateSettings = require('lodash.templatesettings');
const template = require('lodash.template');

const { printRunning, printSuccess, printWarning } = require('../common/log');

const LOCALES_REPO_PATTERN =
	'https://github.com/jsomsanith/locales/archive/{project}/{version}.zip';

function resolveUrl(conf, urlPattern = LOCALES_REPO_PATTERN) {
	if (conf.url) {
		return conf.url;
	}

	templateSettings.interpolate = /{([\s\S]+?)}/g;
	return template(urlPattern)(conf);
}

function fromGithub({ resources, urlPattern, target = process.cwd() }, headers) {
	const promises = resources
		.map((conf, index) => {
			const filesUrl = resolveUrl(conf, urlPattern);
			printRunning(`Let's download ${filesUrl}`);

			const zipPath = path.join(target, `${index}.zip`);
			mkdirp.sync(target);

			let contentType;
			return new Promise((resolve, reject) => {
				request({ url: filesUrl, headers })
					.on('response', response => {
						if (response.statusCode === 404) {
							printWarning(
								`Translations files for ${conf.project}#${
									conf.version
								} don't exist. Please make sure you have the rights or you have set the right authorisation tokens.`,
							);
						}
						if (response.statusCode !== 200) {
							reject('Error while trying to fetch i18n files.');
						}
						contentType = response.headers['content-type'];
					})
					.on('error', err => {
						reject(err);
					})
					.pipe(fs.createWriteStream(zipPath, { autoClose: true }))
					.on('close', () => {
						resolve();
					});
			})
				.then(() => printSuccess(`Files downloaded from ${filesUrl} to ${target}`))
				.then(() => {
					if (contentType !== 'application/zip') {
						return;
					}

					printRunning(`Extracting ${zipPath} to ${target}`);

					/*
					* Zip from github contains a root folder, which is unwanted.
					* So we
					* - extract it to the target,
					* - move its content to the target folder itself
					* - remove the unwanted unzipped root folder
					*/

					const zip = new Zip(zipPath);
					const zipRootFolderPath = path.join(target, zip.getEntries()[0].entryName);

					// extract all content
					zip.extractAllTo(target, true);
					rimraf.sync(zipPath);

					// remove the unwanted unzipped root folder
					mergeDirs(zipRootFolderPath, target, 'overwrite');
					rimraf.sync(zipRootFolderPath);

					printSuccess('Extraction done');
				});
		})
		.filter(p => p);

	return Promise.all(promises).catch(err => {
		console.error(err);
		throw err;
	});
}

module.exports = fromGithub;
