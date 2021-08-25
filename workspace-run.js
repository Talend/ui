/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-console */
const { spawn } = require('child_process');

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
		out.on('exit', () => {
			if (opts.verbose && stderr) {
				console.error(`RUNNER: Child Process STDERR: ${stderr}`);
			}
			if (opts.verbose && stdout) {
				console.error(`RUNNER: Child Process STDOUT: ${stdout}`);
			}
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
	if (cmds.length > 0) {
		const cmd = cmds.pop();
		run(cmd, { verbose: true })
			.then(() => consume(cmds))
			.catch(() => consume(cmds));
	} else {
		process.exit(exitCode);
	}
}

run({ name: 'yarn', args: ['workspaces', '--silent', 'info'] })
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
				acc.push({ name: 'yarn', args: ['workspace', '--silent', pkg, 'run', script].concat(scriptArgs) });
			}
			return acc;
		}, []);
		consume(commands);
	})
	.catch(e => {
		console.error(e);
	});
