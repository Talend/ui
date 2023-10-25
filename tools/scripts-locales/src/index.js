#!/usr/bin/env node
import * as utils from '@talend/scripts-utils';
import { updateCode } from './update-code.js';

const command = process.argv[2];
const args = process.argv.slice(3);

if (command === 'update-code') {
	updateCode(args);
} else {
	console.error(`Command ${command} not found`);
	process.exit(1);
}
