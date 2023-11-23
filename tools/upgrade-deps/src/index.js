/* eslint-disable no-await-in-loop */

/* eslint-disable no-restricted-syntax */

/* eslint no-console: 0 */
import { exec, spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';

import changeset from './changeset.js';
import colors from './colors.js';
import npm from './npm.js';
import pnpm from './pnpm.js';
import yarn from './yarn.js';

const CWD = process.cwd();

async function executeAll(cmds) {
	console.log('EXECUTE ALL:', cmds);
	for (const cmd of cmds) {
		try {
			console.log('\n##################\n', cmd, '\n##################\n');
			// eslint-disable-next-line @typescript-eslint/no-loop-func
			await new Promise((resolve, reject) => {
				const child = exec(cmd, { cwd: process.cwd() });
				child.stdout.on('data', data => {
					console.log(data.toString());
				});
				child.stderr.on('data', data => {
					console.error(colors.red(data.toString()));
				});
				child.on('close', code => {
					if (code === 0) {
						resolve(child.stdout);
					} else {
						reject(code);
						process.exit(code);
					}
				});
			});
		} catch (error) {
			console.error(error);
			process.exit(1);
		}
	}
}

function getOptions(program) {
	const opts = {
		scope: program.scope,
		package: program.package,
		startsWith: program['starts-with'],
		dry: program.dry || false,
		latest: program.latest,
		next: program.next,
		security: program.security,
		message: program.message,
		ignoreScripts: program['ignore-scripts'],
	};

	// Add way to manage pnpm workspace
	const userAgent = process.env.npm_config_user_agent;
	if (userAgent.startsWith('pnpm')) {
		opts.workspace = program.workspace;
	}

	return opts;
}

export async function upgradeYarnProject(program) {
	const commands = [];
	const opts = getOptions(program);

	if (program.changeset && changeset.isSetup()) {
		changeset.add(opts);
		return true;
	}

	const changed = await npm.checkPackageJson(`${CWD}/package.json`, opts);
	let yarnOpts = opts.ignoreScripts ? '--ignore-scripts' : '';
	if (!opts.dry) {
		if (!opts.scope && !opts.package && !opts.startsWith) {
			commands.unshift(`yarn upgrade ${yarnOpts}`);
			if (changed) {
				commands.unshift(`yarn install ${yarnOpts}`);
			}
		} else {
			await yarn.removeFromLockFile(opts);
			commands.unshift(`yarn install ${yarnOpts}`);
		}
		spawnSync(yarn.getYarnDedupBin());
		return executeAll(commands);
	}

	return true;
}

export async function upgradePnpmProject(program) {
	const commands = [];
	const opts = getOptions(program);
	console.log('GET OPTIONS:', opts);

	if (program.changeset && changeset.isSetup()) {
		changeset.add(opts);
		return true;
	}

	const changed = await npm.checkPackageJson(`${CWD}/package.json`, opts);
	let pnpmOpts = opts.ignoreScripts ? '--ignore-scripts' : '';
	if (!opts.dry) {
		if (!opts.scope && !opts.package && !opts.startsWith) {
			commands.unshift(`pnpm update ${pnpmOpts}`);
			if (changed) {
				commands.unshift(`pnpm install ${pnpmOpts}`);
			}
		} else {
			await pnpm.removeFromLockFile(opts);
			commands.unshift(`pnpm install ${pnpmOpts}`);
		}
		spawnSync('pnpm dedupe');
		return executeAll(commands);
	}

	return true;
}

export async function upgradeNpmProject(program) {
	const commands = [];
	const opts = getOptions(program);
	let changed = await npm.checkPackageJson(`${CWD}/package.json`, opts);
	let npmOpts = opts.ignoreScripts ? '--ignore-scripts' : '';
	if (!opts.dry) {
		if (!opts.scope && !opts.package && !opts.startsWith) {
			commands.unshift(`npm update ${npmOpts}`);
			if (changed) {
				commands.unshift(`npm install ${npmOpts}`);
			}
		} else {
			await npm.removeFromLockFile(opts);
			commands.unshift(`npm install ${npmOpts}`);
		}
		commands.push('npm prune');
		return executeAll(commands);
	}
}
