#!/usr/bin/env node
/* eslint-disable global-require,no-console,import/newline-after-import */

const { getEnv } = require('./webapp/utils/env');
const { printSeparator } = require('./webapp/utils/log');
const { getPresetApi } = require('./webapp/utils/preset');

printSeparator('CONFIGURATION');

const command = process.argv[2];
const options = process.argv.slice(3);
console.log(`Running command: ${command}`, `With options: ${options}`);

function getWebappEnv() {
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

	return { env, presetApi };
}

printSeparator('RUN');

let result;
switch (command) {
	case 'start': {
		const { env, presetApi } = getWebappEnv();
		result = require('./webapp/scripts/start')(env, presetApi);
		break;
	}
	case 'build': {
		const { env, presetApi } = getWebappEnv();
		result = require('./webapp/scripts/build')(env, presetApi);
		break;
	}
	case 'lint:es': {
		const { env, presetApi } = getWebappEnv();
		result = require('./webapp/scripts/lint-es')(env, presetApi);
		break;
	}
	case 'test': {
		const { env, presetApi } = getWebappEnv();
		result = require('./webapp/scripts/test')(env, presetApi, options);
		break;
	}
	default:
		console.log(`Command ${command} not found.`);
		process.exit(-1);
}

process.exit(result.status);
