/* eslint-disable no-console */
import { spawn } from 'child_process';

export async function run(cmd, opts = {}) {
	if (opts.verbose) {
		console.log(`\n#### RUNNER: ${cmd.name} ${cmd.args.join(' ')}`);
	}
	const start = Date.now();
	return new Promise(async (resolve, reject) => {
		const out = spawn(cmd.name, cmd.args);
		let stdout = '';
		let stderr = '';
		out.on('error', error => {
			console.error(error);
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
				run.exitCode += 1;
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
				stderr += dataStr;
			}
		});
	});
}
