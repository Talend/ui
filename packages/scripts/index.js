#!/usr/bin/env node
/* eslint-disable global-require,no-console */

const { getEnv } = require('./utils/env');
const { printSeparator } = require('./utils/log');
const { getPresetApi } = require('./utils/preset');

printSeparator('CONFIGURATION');

const command = process.argv[2];
console.log(`Running command: ${command}`);
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

let result;
switch (command) {
	case 'start':
		result = require('./scripts/start')(env, presetApi);
		break;
	case 'build':
		result = require('./scripts/build')(env, presetApi);
		break;
	case 'lint:es':
		result = require('./scripts/lint-es')(env, presetApi);
		break;
	default:
		console.log(`Command ${command} not found.`);
		process.exit(-1);
}

process.exit(result.status);
