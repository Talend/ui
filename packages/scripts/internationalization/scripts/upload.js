const path = require('path');
const { login, getProject, uploadFile } = require('../common/xtm');
const error = require('../common/error');

function upload({ extract, load }) {
	const data = {
		filePath: path.join(process.cwd(), extract.target, 'i18n.zip'),
		projectName: load.project,
	};
	return getProject(data)
		.then(uploadFile)
		.catch(e => {
			error(e.message);
		});
}

module.exports = upload;
