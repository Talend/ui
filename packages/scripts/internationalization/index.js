/* eslint-disable global-require,no-console */

const fs = require('fs');
const path = require('path');
const error = require('./common/error');

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
	const scriptName = command.replace('i18n-', '');
	require(`./scripts/${scriptName}`)(configuration);
};
