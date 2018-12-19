const path = require('path');
const Zip = require('adm-zip');
const { getXTMVariables, login, getProject, downloadFile } = require('../common/xtm');
const { error } = require('../common/log');

function unzip({ targetPath }) {
	const filePath = path.join(targetPath, 'i18n.zip');
	const extractPath = path.join(targetPath, 'i18n');
	const zip = new Zip(filePath);
	zip.extractAllTo(extractPath, true);
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
