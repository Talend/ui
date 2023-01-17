#!/usr/bin/env node
/* eslint-disable no-console */
import { workspaceRun } from './workspace-run.js';

const command = process.argv[2];
const args = process.argv.slice(3);

if (command === 'run') {
	workspaceRun(args);
}
