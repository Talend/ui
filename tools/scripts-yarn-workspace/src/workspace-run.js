/* eslint-disable no-console */
import { run } from './run.js';

export async function workspaceRun(scriptArgs) {
	const [script, ...extraArgs] = scriptArgs;
	const args = ['-r', 'run', script, '--if-present', ...extraArgs];

	if (!process.env.EXECUTE_PARALLEL) {
		args.push('--workspace-concurrency=1');
	}
	if (process.env.WORKSPACE_RUN_FAIL === 'no-bail') {
		args.push('--no-bail');
	}

	try {
		await run({ name: 'pnpm', args }, { verbose: Boolean(process.env.VERBOSE) });
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}
