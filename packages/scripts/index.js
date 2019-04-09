#!/usr/bin/env node
/* eslint-disable global-require,no-console,import/newline-after-import */

const { printSeparator } = require('./common/log');

printSeparator('CONFIGURATION');

const command = process.argv[2];
const options = process.argv.slice(3);
console.log(`Running command: ${command}`, `With options: ${options}`);

switch (command) {
	case 'start':
	case 'build':
	case 'build:lib':
	case 'lint:es':
	case 'test':
	case 'test:ng':
	case 'extends':
		require('./webapp')(command, options);
		break;
	default:
		console.log(`Command ${command} not found.`);
		process.exit(-1);
}
