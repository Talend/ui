/* eslint-disable global-require,no-console */

const { getEnv } = require('./utils/env');
const { getPresetApi } = require('./utils/preset');
const { printSeparator } = require('../common/log');

function getMode(command, options) {
	if (options.includes('--dev')) {
		return 'development';
	} else if (options.includes('--prod')) {
		return 'production';
	}
	return command === 'start' ? 'development' : 'production';
}

module.exports = function runWebappScript(command, options) {
	printSeparator('CONFIGURATION');

	const restOptions = options.filter(opt => opt !== '--dev' && opt !== '--prod');

	// current env vars and talend scripts configuration in <project-folder>/talend-scripts.json
	const env = getEnv();
	env.TALEND_MODE = getMode(command, options);
	console.log(`Talend scripts mode : ${env.TALEND_MODE}`);
	if (env.TALEND_SCRIPTS_CONFIG) {
		console.log('Talend scripts configuration file found and loaded');
	}

	// object passed to preset
	const presetApi = getPresetApi(env);

	printSeparator('RUN');

	const commandFileName = command.replace(':', '-');
	const result = require(`./scripts/${commandFileName}`)(env, presetApi, restOptions);
	process.exit(result.status);
};
