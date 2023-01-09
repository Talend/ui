/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop, no-restricted-syntax */
import fs from 'fs';
import fsprom from 'fs/promises';
import os from 'os';
import util from 'util';
import path from 'path';
import { exec } from 'child_process';
import semver from 'semver';
import stripAnsi from 'strip-ansi';
import colors from './colors';

const execProm = util.promisify(exec);
const CWD = process.cwd();

/**
 * Singleton used to update
 * In case we are in mono repository it will force alignment in package.json
 */
const CACHE = {};

function isNumeric(str) {
	return /^\d+$/.test(str);
}

class PackageJson {
	constructor(filePath) {
		this.pkgJsonPath = filePath;
		this.content = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));
		this.hasChanged = false;
	}

	change(pkgName, version) {
		const cleanVersion = version.match(/^\d/) ? `^${version}` : version;

		if (
			this.content.dependencies?.[pkgName] &&
			this.content.dependencies[pkgName] !== cleanVersion
		) {
			this.content.dependencies[pkgName] = cleanVersion;
			this.hasChanged = true;
			return `Upgraded package.json dependencies with ${pkgName}@${cleanVersion}`;
		} else if (
			this.content.devDependencies?.[pkgName] &&
			this.content.devDependencies[pkgName] !== cleanVersion
		) {
			this.content.devDependencies[pkgName] = cleanVersion;
			this.hasChanged = true;
			const peer = this.content.peerDependencies?.[pkgName];
			if (peer && !semver.satisfies(version, peer)) {
				this.content.peerDependencies[pkgName] = cleanVersion;
				return `Upgraded package.json dev dependencies and peer with ${pkgName}@${cleanVersion}`;
			}
			return `Upgraded package.json dev dependencies with ${pkgName}@${cleanVersion}`;
		}
		return '';
	}

	write() {
		if (this.hasChanged) {
			fs.writeFileSync(this.pkgJsonPath, JSON.stringify(this.content, null, 2) + os.EOL);
		}
	}
}

export function createPackageJsonManager(filePath) {
	return new PackageJson(filePath);
}

async function getNext(dependency) {
	if (!CACHE[dependency]) {
		const nextVersion = await execProm(`npm dist-tag ls ${dependency}`);
		CACHE[dependency] = nextVersion.stdout
			.split('\n')
			.filter(line => line.includes('next:'))[0]
			.replace('next: ', '');
	}
	return CACHE[dependency];
}

async function getLatest(dependency) {
	if (!CACHE[dependency]) {
		const latest = await execProm(`npm view ${dependency} version latest`);
		CACHE[dependency] = latest.stdout.replace('\n', '');
	}
	return CACHE[dependency];
}

export async function getUpdate(dependency, requirement) {
	const cachekey = `${dependency}@${requirement}`;
	if (!CACHE[cachekey]) {
		const latest = await execProm(`npm view ${dependency}@"${requirement}" version --json`);
		const output = JSON.parse(stripAnsi(latest.stdout));
		if (Array.isArray(output)) {
			CACHE[cachekey] = output.pop();
		} else {
			CACHE[cachekey] = output;
		}
	}
	return CACHE[cachekey];
}

function getFilterInDependencies(opts) {
	return key =>
		(!opts.package && !opts.startsWith && !opts.scope) ||
		(opts.scope && key.startsWith(`${opts.scope}/`)) ||
		(opts.startsWith && key.startsWith(opts.startsWith)) ||
		(opts.package && key === opts.package);
}

async function checkVersionsOf(pkgJson, opts) {
	const keyFilter = getFilterInDependencies(opts);
	const allDependencies = Object.entries(pkgJson.content.dependencies || {})
		.concat(Object.entries(pkgJson.content.devDependencies || {}))
		.filter(([key]) => keyFilter(key));

	if (!allDependencies.length) {
		return false;
	}

	let changed = false;
	for (const dependency of allDependencies) {
		const [depName, requestedVersion] = dependency;

		if (requestedVersion.startsWith('npm:') || requestedVersion.startsWith('github:')) {
			console.log('unable to parse version', depName, requestedVersion);
			continue;
		}

		let semantic = requestedVersion[0];
		if (isNumeric(semantic)) {
			semantic = '';
		}

		try {
			let newVersion;
			if (opts.next) {
				newVersion = await getNext(depName);
			} else if (opts.latest) {
				newVersion = await getLatest(depName);
			} else {
				newVersion = await getUpdate(depName, requestedVersion);
			}

			if (newVersion && requestedVersion !== `${semantic}${newVersion}`) {
				const isMajor = !semver.satisfies(newVersion, requestedVersion);
				let msg = `"${depName}": "${requestedVersion}" => "^${newVersion}"`;
				if (isMajor) {
					msg = colors.bold(msg);
				}
				console.log(msg);
				if (!opts.dry) {
					pkgJson.change(depName, `^${newVersion}`);
					changed = true;
				}
			}
		} catch (error) {
			console.error(error);
		}
	}
	return changed;
}

export async function checkPackageJson(filePath, opts) {
	console.log(
		`\n${
			opts.dry ? 'check' : `update ${opts.scope || opts.package || 'all'} packages`
		} versions of ${filePath} using ${
			(opts.latest && 'latest') || (opts.next && 'next') || 'same requirements'
		}`,
	);

	const pkgJson = createPackageJsonManager(filePath);
	// npm ls command works only before any changes
	let npmLs;
	if (pkgJson.content.workspaces && fs.existsSync(`${path.dirname(filePath)}/package-lock.json`)) {
		npmLs = await execProm('npm ls --json');
	}
	let changed = await checkVersionsOf(pkgJson, opts);

	if (!opts.dry && changed) {
		pkgJson.write();
	}
	if (fs.existsSync(`${path.dirname(filePath)}/lerna.json`)) {
		try {
			const list = await execProm('lerna list -l --json --all');
			if (list.stdout) {
				const listInfo = JSON.parse(stripAnsi(list.stdout));
				for (const pkgInfo of listInfo) {
					const result = await checkPackageJson(`${pkgInfo.location}/package.json`, opts);
					changed = changed || result;
				}
			}
		} catch (error) {
			console.error(error);
		}
	} else if (pkgJson.content.workspaces && fs.existsSync(`${path.dirname(filePath)}/yarn.lock`)) {
		try {
			const list = await execProm('yarn --silent workspaces info --json');
			if (list.stdout) {
				const objInfo = JSON.parse(stripAnsi(list.stdout));
				for (const pkgInfo of Object.values(objInfo)) {
					const result = await checkPackageJson(path.join(pkgInfo.location, 'package.json'), opts);
					changed = changed || result;
				}
			}
		} catch (error) {
			console.error(error);
		}
	} else if (
		pkgJson.content.workspaces &&
		fs.existsSync(`${path.dirname(filePath)}/package-lock.json`)
	) {
		try {
			if (npmLs.stdout) {
				const objInfo = JSON.parse(stripAnsi(npmLs.stdout));
				for (const pkgName of Object.keys(objInfo.dependencies)) {
					const info = { name: pkgName, ...objInfo.dependencies[pkgName] };
					if (info.resolved && info.resolved.startsWith('file:')) {
						const resolved = info.resolved.replace('file:', '').replace(/\.\.\//g, '');
						const result = await checkPackageJson(path.join(resolved, 'package.json'), opts);
						changed = changed || result;
					}
				}
			}
		} catch (error) {
			console.error(error);
		}
	}
	return changed;
}

/** @returns function to filter */
function getFilterInLockFile(opts, exact) {
	if (!exact) {
		return key =>
			(opts.scope && key.includes(`${opts.scope}/`)) ||
			(opts.package && key.endsWith(`${opts.package}"`)) ||
			(opts.startsWith && key.includes(opts.startsWith));
	}
	return key =>
		(opts.scope && key.startsWith(`${opts.scope}/`)) ||
		(opts.package && key === opts.package) ||
		(opts.startsWith && key.startsWith(opts.startsWith));
}

export async function removeFromLockFile(opts) {
	let content;
	try {
		content = await fsprom.readFile(`${CWD}/package-lock.json`);
	} catch (e) {
		console.error(e);
		return;
	}
	const pkgLock = JSON.parse(content);
	Object.keys(pkgLock.packages)
		.filter(getFilterInLockFile(opts))
		.forEach(key => {
			delete pkgLock.packages[key];
			console.log(`remove ${key} from package-lock.json`);
		});
	Object.keys(pkgLock.dependencies)
		.filter(getFilterInLockFile(opts, true))
		.forEach(key => {
			delete pkgLock.dependencies[key];
			console.log(`remove ${key} from package-lock.json`);
		});
	try {
		await fsprom.writeFile(`${CWD}/package-lock.json`, JSON.stringify(pkgLock, null, 2));
	} catch (e) {
		console.error(e);
	}
}
