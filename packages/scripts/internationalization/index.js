/* eslint-disable global-require,no-console */

const fs = require('fs');
const path = require('path');
const error = require('./common/error');
const extract = require('./extract');
const upload = require('./upload');
const download = require('./download');

module.exports = function runInI18n(command) {
	function processConfigFile() {
		const configPath = path.join(process.cwd(), 'talend-i18n.json');
		if (!fs.existsSync(configPath)) {
			error(`
			You need to provide a path to config file.
			${configPath} doesn't exist.
		`);
		}
		return require(configPath);
	}

	const configuration = processConfigFile();

	switch (command) {
		case 'i18n-extract':
			extract(configuration);
			break;
		case 'i18n-upload':
			upload(configuration);
			break;
		case 'i18n-download':
			download(configuration);
			break;
		default:
			console.log(`Command ${command} not found.`);
			process.exit(-1);
	}
};
