/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-console */

const os = require('os');
let spawn = require('child_process').spawn;

if (os.platform() === 'win32') {
	/* eslint-disable-next-line import/no-extraneous-dependencies */
	spawn = require('cross-spawn');
}

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
	const start = Date.now();
	return new Promise((resolve, reject) => {
		const out = spawn(cmd.name, cmd.args);
		let stdout = '';
		let stderr = '';
		out.on('error', error => {
			console.error(error);
			run.exitCode += 1;
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
			const end = Date.now();
			console.log(
				`#### RUNNER: ${cmd.name} ${cmd.args.join(' ')} exit code ${code} in ${
					(end - start) / 1000
				} seconds`,
			);
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

run.exitCode = 0;

module.exports = run;
