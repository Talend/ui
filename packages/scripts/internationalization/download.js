const path = require('path');
const Zip = require('adm-zip');
const { getXTMVariables, login, getProject, downloadFile } = require('./common/xtm');
const error = require('./common/error');

const languageRegex = /^[a-z]{2}_[A-Z]{2}$/;

function unzipFlatten(zip, extractPath) {
	const zipEntries = zip.getEntries();
	zipEntries.forEach(({ entryName }) => {
		console.log('\nNext', entryName);
		const language = entryName.split(path.sep)[0];
		if (!language.match(languageRegex)) {
			console.log('=> Not in a language folder, skip it');
			return;
		}

		const languagePath = path.join(extractPath, language);
		console.log('Target', path.resolve(languagePath, path.basename(entryName)));

		zip.extractEntryTo(entryName, languagePath, false, true);
		console.log('=> Extraction done');
	});
}

function unzip({ targetPath, transform }) {
	const filePath = path.join(targetPath, 'i18n.zip');
	const extractPath = path.join(targetPath, 'i18n');
	const zip = new Zip(filePath);

	if (transform === 'flatten') {
		console.log('Transformation : flatten');
		unzipFlatten(zip, extractPath);
	} else {
		console.log('Transformation : none');
		zip.extractAllTo(extractPath, true);
	}
}

function download({ load }) {
	const data = {
		targetPath: path.join(process.cwd(), load.target),
		projectName: load.project,
		transform: load.transform,
		xtm: getXTMVariables(),
	};
	return login(data)
		.then(getProject)
		.then(downloadFile)
		.then(unzip)
		.catch(e => {
			error(e.message);
		});
}

module.exports = download;
