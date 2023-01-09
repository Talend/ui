#!/usr/bin/env node
/* eslint-disable import/extensions */
/* eslint-disable no-console */

import { getEnv } from './utils/env.js';
import { getPresetApi } from './utils/preset.js';
import { printSeparator } from './utils/log.js';

const command = process.argv[2];
const options = process.argv.slice(3);

if (command === '--help' || command === '-h' || command === 'help') {
	console.log(`Please use one of the following commands:
* start
* build
* build:lib:umd
* test
* extends
* start-storybook
* build-storybook
`);
	process.exit(0);
}
console.log(`Running command: ${command}`, `With options: ${options}`);

function getMode() {
	if (options.includes('--dev')) {
		return 'development';
	} else if (options.includes('--prod')) {
		return 'production';
	}
	return command === 'start' ? 'development' : 'production';
}

async function runScript() {
	printSeparator('CONFIGURATION');

	const restOptions = options.filter(
		opt => opt !== '--dev' && opt !== '--prod' && !opt.startsWith('--config='),
	);

	// current env vars and talend scripts configuration in <project-folder>/talend-scripts.(js/json)
	const env = getEnv(options);
	env.TALEND_MODE = getMode(command, options);
	console.log(`Talend scripts mode : ${env.TALEND_MODE}`);
	if (env.TALEND_SCRIPTS_CONFIG) {
		console.log('Talend scripts configuration file found and loaded');
	}

	// object passed to preset
	const presetApi = getPresetApi(env);

	printSeparator('RUN');

	const commandFileName = command.replace(/:/g, '-');
	const script = await import(`./scripts/${commandFileName}.js`);
	const result = script.default(env, presetApi, restOptions);

	if (result.then) {
		result
			.then(() => {
				process.exit(0);
			})
			.catch(() => {
				process.exit(1);
			});
	} else {
		process.exit(result.status);
	}
}

switch (command) {
	case 'build':
	case 'build-storybook':
	case 'lint':
	case 'start':
	case 'start-storybook':
	case 'test':
		runScript(command, options);
		break;
	default:
		console.log(`Command ${command} not found.`);
		process.exit(-1);
}

/* eslint-disable global-require,no-console */
