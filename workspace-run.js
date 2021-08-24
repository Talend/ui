/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-console */
const { exec } = require('child_process');

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
		console.log(`#### RUNNER: ${cmd}`);
	}
	return new Promise((resolve, reject) => {
		const out = exec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.error(error);
				exitCode += 1;
				return reject(error);
			}
			if (stderr) {
				if (opts.verbose) {
					console.error(`RUNNER: Child Process STDERR: ${stderr}`);
				}
			}
			if (stdout) {
				if (opts.verbose) {
					console.log(`RUNNER: Child Process STDOUT: ${stdout}`);
				}
				return resolve(stdout);
			}
			return reject(stderr);
		});
		out.on('exit', code => {
			if (opts.verbose) {
				console.log(`RUNNER: Child process exited with exit code ${code}`);
			}
		});
	});
}
const script = process.argv.slice(2);

function consume(cmds) {
	if (cmds.length > 0) {
		const cmd = cmds.pop();
		run(cmd, { verbose: true })
			.then(() => consume(cmds))
			.catch(() => consume(cmds));
	} else {
		process.exit(exitCode);
	}
}

run('yarn workspaces --silent info')
	.then(infoOutput => {
		let info = {};
		try {
			info = JSON.parse(infoOutput);
		} catch (e) {
			console.error(e);
		}
		// now we have all the info
		const commands = Object.keys(info).reduce((acc, pkg) => {
			const packageJson = require(`./${info[pkg].location}/package.json`);
			if (packageJson.scripts[script]) {
				acc.push(`yarn workspace --silent ${pkg} run ${script}`);
			}
			return acc;
		}, []);
		consume(commands);
	})
	.catch(e => {
		console.error(e);
	});
