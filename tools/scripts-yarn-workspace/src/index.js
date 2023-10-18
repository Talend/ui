#!/usr/bin/env node
import { workspaceRun } from './workspace-run.js';
import { mergeReport } from './merge-report.js';
import { mergeReportPnpm } from './merge-report-pnpm.js';
const command = process.argv[2];
const args = process.argv.slice(3);

if (command === 'run') {
	workspaceRun(args);
} else if (command === 'lint-merge-report') {
	mergeReport(args);
} else if (command === 'lint-merge-report-pnpm') {
	mergeReportPnpm(args);
} else {
	console.error(`Command ${command} not found`);
	process.exit(1);
}
