/* eslint-disable global-require,no-console */

const { getEnv } = require('./utils/env');
const { getPresetApi } = require('./utils/preset');
const { printSeparator } = require('../common/log');

module.exports = function runWebappScript(command, options) {
	printSeparator('CONFIGURATION');

	const mode = command === 'start' ? 'development' : 'production';
	console.log(`Talend scripts mode : ${mode}`);

	// current env vars and talend scripts configuration in <project-folder>/talend-scripts.json
	const env = getEnv();
	env.TALEND_MODE = mode;
	if (env.TALEND_SCRIPTS_CONFIG) {
		console.log('Talend scripts configuration file found and loaded');
	}

	// object passed to preset
	const presetApi = getPresetApi(env);

	printSeparator('RUN');

	const commandFileName = command.replace(':', '-');
	const result = require(`./scripts/${commandFileName}`)(env, presetApi, options);
	process.exit(result.status);
};
