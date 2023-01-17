import fs from 'fs';
import path from 'path';
import { run } from './run.js';
import { consume } from './consume.js';

export function workspaceRun(scriptArgs) {
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

					// const packageJson = require(path.resolve(path.join('.', location, 'package.json')));
					const packageJson = JSON.parse(
						fs.readFileSync(path.resolve(path.join('.', location, 'package.json'))),
					);
					if (packageJson.scripts && packageJson.scripts[scriptArgs[0]]) {
						return {
							name: 'yarn',
							args: ['workspace', packageName, 'run'].concat(scriptArgs),
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
}
