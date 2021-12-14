/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-console */
const path = require('path');

const run = require('./run');

const script = process.argv[2];
const scriptArgs = process.argv.slice(3);

function consume(cmds) {
	if (cmds.length > 0 && !process.env.EXECUTE_PARALLEL) {
		const cmd = cmds.shift();
		run(cmd, { verbose: true })
			.then(() => consume(cmds))
			.catch(() => {
				if (process.env.WORKSPACE_RUN_FAIL === 'no-bail') {
					consume(cmds);
				} else {
					process.exit(run.exitCode);
				}
			});
	} else if (process.env.EXECUTE_PARALLEL) {
		Promise.all(cmds.map(cmd => run(cmd, { verbose: false }))).finally(() =>
			process.exit(run.exitCode),
		);
	} else {
		process.exit(run.exitCode);
	}
}

run({ name: 'yarn', args: ['workspaces', '--silent', 'info'] })
	.then(info => JSON.parse(info))
	.then(workspaceInfo => {
		const orderedWorkspaceInfo = Object.entries(workspaceInfo).reduce(
			(accu, [packageName, packageInfo]) => {
				const { commands, packages } = accu;
				const { location, workspaceDependencies } = packageInfo;

				const packageJson = require(path.resolve(path.join('.', location, 'package.json')));
				if (packageJson.scripts[script]) {
					const cmd = {
						name: 'yarn',
						args: ['workspace', '--silent', packageName, 'run', script].concat(scriptArgs),
					};

					// package must be built after its workspace dependencies
					// let's place the command, after the dependencies in the commands list
					// to do that, we find the dependencies index, and put the command after the last dependency (max index)
					let packagePlace = 0;
					if (workspaceDependencies.length) {
						const depsIndexes = workspaceDependencies.map(dep => packages.indexOf(dep));
						packagePlace = Math.max(...depsIndexes) + 1;
					}

					packages.splice(packagePlace, 0, packageName);
					commands.splice(packagePlace, 0, cmd);
				}

				return accu;
			},
			{ commands: [], packages: [] },
		);
		consume(orderedWorkspaceInfo.commands);
	})
	.catch(e => {
		console.error(e);
	});
