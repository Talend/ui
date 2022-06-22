/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-console */
const path = require('path');

const run = require('./run');

const script = process.argv[2];
const scriptArgs = process.argv.slice(3);

const options = {
	verbose: process.env.VERBOSE,
};

function consume(cmds) {
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

run({ name: 'yarn', args: ['workspaces', '--silent', 'info'] })
	.then(info => JSON.parse(info))
	.then(workspaceInfo => {
		function add(acc, pkg) {
			if (acc.indexOf(pkg) !== -1) {
				return acc;
			}
			const wd = workspaceInfo[pkg].workspaceDependencies;

			wd.reduce((kcc, dep) => {
				add(kcc, dep);
				return kcc;
			}, acc);
			acc.push(pkg);
			return acc;
		}
		const packages = Object.keys(workspaceInfo).reduce(add, []);
		const commands = packages
			.map(packageName => {
				const packageInfo = workspaceInfo[packageName];
				const { location } = packageInfo;

				const packageJson = require(path.resolve(path.join('.', location, 'package.json')));
				if (packageJson.scripts && packageJson.scripts[script]) {
					return {
						name: 'yarn',
						args: ['workspace', packageName, 'run', script].concat(scriptArgs),
					};
				}

				return undefined;
			})
			.filter(Boolean);
		consume(commands);
	})
	.catch(e => {
		console.error(e);
	});
