/* eslint-disable no-console */
/* eslint-disable-next-line import/no-extraneous-dependencies */
const spawn = require('cross-spawn');
const fs = require('fs');
const readline = require('readline');

const cache = {
	watch: [],
};

function setup() {
	const found = process.env.PATH.split(':').find(p => p === 'node_modules/.bin');
	if (!found) {
		process.env = {
			...process.env,
			PATH: `node_module/.bin:${process.env.PATH}`,
		};
	}
}
function tearDown() {
	console.log('cmd.tearDown()');
	cache.tearDown = true;

	cache.watch.forEach(info => {
		if (info.process.exitCode === null) {
			console.log('cmd.tearDown send kill signal to', info.debug);
			info.process?.kill('SIGINT');
		}
	});
}

function getCmd(cmdStrOrObj, opts) {
	let cmd = cmdStrOrObj;
	if (typeof cmd === 'string') {
		const args = cmd.split(' ');
		const name = args.shift();
		cmd = { name, args, cwd: opts.cwd };
	}
	return cmd;
}

function runSync(cmdStrOrObj, opts = {}) {
	const cmd = getCmd(cmdStrOrObj, opts);
	let out;
	try {
		out = spawn.sync(cmd.name, cmd.args, {
			cwd: cmd.cwd,
			shell: process.env.SHELL,
			env: process.env,
		});
	} catch (error) {
		console.error(error);
	}
	return out;
}

function run(cmdStrOrObj, opts = {}) {
	const cmd = getCmd(cmdStrOrObj, opts);
	const PREFIX = `${cmd.cwd} ${cmd.name} ${cmd.args.join(' ')}`;
	if (opts.verbose) {
		console.log('$', PREFIX);
	}
	return new Promise((resolve, reject) => {
		if (cmd.cwd && !fs.existsSync(cmd.cwd)) {
			reject(new Error(`The folder ${cmd.cwd} do not exists`));
			return;
		}
		const out = spawn(cmd.name, cmd.args, {
			cwd: cmd.cwd,
			stdio: 'pipe',
			shell: process.env.SHELL,
			env: process.env,
		});
		cache.watch.push({ process: out, cmd, debug: PREFIX });
		let stdout = '';
		out.on('error', error => {
			if (!opts.silent) {
				console.error(error);
			}
			reject(error);
		});
		out.on('close', () => {
			resolve(stdout);
		});
		out.stdout.on('data', data => {
			const datastr = data.toString();
			if (opts.verbose) {
				console.log(datastr);
			}
			if (data && datastr) {
				stdout += datastr;
			}
		});

		out.stderr.on('data', data => {
			const datastr = data.toString();
			if (data && datastr) {
				console.error(datastr);
			}
		});
		if (opts.interactive) {
			opts.interactive(out);
		}
	});
}

function consume(cmds, opts) {
	// check we are not in the middle of tearDown process
	if (cache.tearDown) {
		return Promise.resolve();
	}
	if (cmds.length > 0) {
		const cmd = cmds.shift();
		return run(cmd, opts)
			.then(output => {
				if (opts && opts.onSuccess) {
					opts.onSuccess(cmd, output);
				}
				return consume(cmds, opts);
			})
			.catch(error => {
				if (process.env.WORKSPACE_RUN_FAIL === 'no-bail') {
					consume(cmds);
				} else {
					throw error;
				}
			});
	}
	return Promise.resolve();
}

function prompt(history, onSuccess, onClose) {
	return new Promise(resolve => {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
			terminal: true,
			history,
			prompt: '$ ',
		});
		rl.prompt();
		rl.on('line', async line => {
			const trimed = line.trim();
			if (trimed === '') {
				rl.close();
				resolve();
				return;
			}
			if (trimed === 'q') {
				onClose();
				rl.close();
				process.exit(0);
			}
			const [cwd, name, ...args] = trimed.split(' ');
			const cmd = { cwd, name, args };
			try {
				await consume([cmd], {
					onSuccess,
					verbose: true,
				});
			} catch (error) {
				console.error(error);
			}
			rl.close();
			resolve(prompt(history.concat(trimed), onSuccess, onClose));
		});
	});
}

module.exports = {
	prompt,
	setup,
	consume,
	run,
	tearDown,
	runSync,
};
