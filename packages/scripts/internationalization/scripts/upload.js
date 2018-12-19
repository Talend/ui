const path = require('path');
const { getXTMVariables, login, getProject, uploadFile } = require('../common/xtm');
const { error } = require('../common/log');

function upload({ load }) {
	const data = {
		filePath: path.join(process.cwd(), 'i18n.zip'),
		projectName: load.project,
		xtm: getXTMVariables(),
	};
	return login(data)
		.then(getProject)
		.then(uploadFile)
		.catch(e => {
			error(e.message);
		});
}

module.exports = upload;
