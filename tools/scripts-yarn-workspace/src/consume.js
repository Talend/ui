import { run } from './run.js';

const options = {
	verbose: process.env.VERBOSE,
};

export function consume(cmds) {
	if (cmds.length > 0 && !process.env.EXECUTE_PARALLEL) {
		const cmd = cmds.shift();
		run(cmd, options)
			.then(() => consume(cmds))
			.catch(error => {
				if (process.env.WORKSPACE_RUN_FAIL === 'no-bail') {
					consume(cmds);
				} else {
					console.error(error);
					process.exit(1);
				}
			});
	} else if (process.env.EXECUTE_PARALLEL) {
		Promise.all(cmds.map(cmd => run(cmd, options)))
			.catch(error => {
				console.error(error);
				process.exit(1);
			})
			.then(() => {
				process.exit(0);
			});
	} else {
		process.exit(0);
	}
}
