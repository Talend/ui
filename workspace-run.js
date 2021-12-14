/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-console */
/* eslint-disable-next-line import/no-extraneous-dependencies */
const spawn = require('cross-spawn');
const path = require('path');

let exitCode = 0;

/**
 * "yarn workspaces run lint:es" command has an issue with eslint which exit in error.
 * It makes the monorepository command fail and stop at the first
 * package.
 * This script let you run a script regardless the exit code.
 * node workspace-run.js SCRIPT_NAME
 *
 * The exitCode will give you an int with the number of pkg in error.
 */
function run(cmd, opts = {}) {
	if (opts.verbose) {
		console.log(`#### RUNNER: ${cmd.name} ${cmd.args.join(' ')}`);
	}
	return new Promise((resolve, reject) => {
		const out = spawn(cmd.name, cmd.args);
		let stdout = '';
		let stderr = '';
		out.on('error', error => {
			console.error(error);
			exitCode += 1;
			reject(error);
		});
		out.on('close', () => {
			resolve(stdout);
		});
		out.on('exit', code => {
			if (opts.verbose && stderr) {
				console.error(`#### RUNNER: Child Process STDERR: ${stderr}`);
			}
			if (opts.verbose && stdout) {
				console.error(`#### RUNNER: Child Process STDOUT: ${stdout}`);
			}
			if (code > 0) {
				console.error(`#### RUNNER: ${cmd.name} ${cmd.args.join(' ')} exit code ${code}`);
				reject(stderr);
				return;
			}
			console.log(`#### RUNNER: ${cmd.name} ${cmd.args.join(' ')} exit code ${code}`);
			resolve(stdout);
		});
		out.stdout.on('data', data => {
			const datastr = data.toString();
			if (data && datastr) {
				stdout += datastr;
			}
		});

		out.stderr.on('data', data => {
			const datastr = data.toString();
			if (data && datastr) {
				stderr += data.toString();
			}
		});
	});
}
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
					process.exit(exitCode);
				}
			});
	} else if (process.env.EXECUTE_PARALLEL) {
		Promise.all(cmds.map(cmd => run(cmd, { verbose: false }))).finally(() =>
			process.exit(exitCode),
		);
	} else {
		process.exit(exitCode);
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
