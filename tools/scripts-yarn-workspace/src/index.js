#!/usr/bin/env node
import { workspaceRun } from './workspace-run.js';

const command = process.argv[2];
const args = process.argv.slice(3);

if (command === 'run') {
	workspaceRun(args);
} else {
	console.error(`Command ${command} not found`);
	process.exit(1);
}
