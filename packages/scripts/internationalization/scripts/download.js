const fs = require('fs');
const path = require('path');
const Zip = require('adm-zip');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const { getXTMVariables, login, getProject, downloadFile } = require('../common/xtm');
const { error, printRunning } = require('../common/log');

function unzip(data) {
	const { targetPath } = data;
	const filePath = path.join(targetPath, 'i18n.zip');
	const extractPath = path.join(targetPath);
	const zip = new Zip(filePath);
	zip.extractAllTo(extractPath, true);
	rimraf.sync(filePath);
	return data;
}

function reshapeFolders(data) {
	const { targetPath } = data;
	fs.readdirSync(targetPath).forEach(language => {
		const languagePath = path.join(targetPath, language);
		fs.readdirSync(languagePath).forEach(version => {
			const languageVersionPath = path.join(targetPath, language, version);
			const versionLanguagePath = path.join(targetPath, version, language);
			printRunning(`Move ${languageVersionPath} --> ${versionLanguagePath}`);

			mkdirp.sync(versionLanguagePath);

			fs.readdirSync(languageVersionPath).forEach(fileName => {
				fs.renameSync(
					path.join(languageVersionPath, fileName),
					path.join(versionLanguagePath, fileName),
				);
			});
		});
		rimraf.sync(languagePath);
	});
	return data;
}

function download({ load }) {
	const data = {
		targetPath: path.join(process.cwd(), load.target),
		projectName: load.project,
		transform: load.transform,
		xtm: getXTMVariables(),
	};
	rimraf.sync(data.targetPath);
	return login(data)
		.then(getProject)
		.then(downloadFile)
		.then(unzip)
		.then(reshapeFolders)
		.catch(e => {
			error(e.message);
		});
}

module.exports = download;
