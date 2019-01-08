/* eslint-disable global-require,no-console */
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const request = require('request');
const Zip = require('adm-zip');

const { printRunning, printSuccess } = require('../common/log');

const LOCALES_REPO_PATTERN =
	'https://github.com/jsomsanith/locales/archive/{project}/{version}.zip';

function resolveUrl(conf, urlPattern = LOCALES_REPO_PATTERN) {
	if (conf.url) {
		return conf.url;
	}

	return urlPattern //
		.replace('{version}', conf.version) //
		.replace('{project}', conf.project);
}

function fromGithub({ resources, urlPattern }) {
	const promises = resources
		.map((conf, index) => {
			const filesUrl = resolveUrl(conf, urlPattern);
			printRunning(`Let's download ${filesUrl}`);

			const target = conf.target || process.cwd();
			const zipPath = path.join(target, `${index}.zip`);
			mkdirp.sync(target);

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
				.then(() => printSuccess(`Files downloaded from ${filesUrl} to ${target}`))
				.then(() => {
					printRunning(`Extracting ${zipPath} to ${target}`);
					const zip = new Zip(zipPath);
					zip.extractAllTo(target, true);
					rimraf.sync(zipPath);
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
