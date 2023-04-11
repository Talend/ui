/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import yarnpkg from '@yarnpkg/lockfile';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const CWD = process.cwd();

function parseKey(key) {
	const parts = key.split('@');
	const version = parts.pop();
	const name = parts.join('@');
	return { name, version };
}

function getPackageFullMetadata(key, yarnLockMetadata) {
	const { name, version } = parseKey(key);

	return {
		key,
		name,
		requestedVersion: version,
		...yarnLockMetadata,
	};
}
class YarnLock {
	constructor(filePath) {
		this.yarnLockPath = filePath;
		const yarnLockFile = fs.readFileSync(filePath, 'utf8');
		this.content = yarnpkg.parse(yarnLockFile).object;
		this.entries = Object.entries(this.content);
		this.hasChanged = false;
	}

	remove(key) {
		if (this.content[key]) {
			delete this.content[key];
			this.hasChanged = true;
			return `Removed entry with ${key} in yarn.lock`;
		}
		return '';
	}

	#whyRecursive(packageMetadata, breadcrumb, results) {
		if (breadcrumb.find(step => step.key === packageMetadata.key)) {
			return;
		}

		const newBreadcrumb = [packageMetadata].concat(breadcrumb);
		const parents = this.entries
			.filter(
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				([_, metadata]) =>
					metadata.dependencies &&
					Object.entries(metadata.dependencies).find(dep => dep.join('@') === packageMetadata.key),
			)
			.map(([key, metadata]) => getPackageFullMetadata(key, metadata));

		if (parents.length) {
			parents.forEach(parent => this.#whyRecursive(parent, newBreadcrumb, results));
		} else {
			results.push(newBreadcrumb);
		}
	}

	why(key) {
		const packageMetadata = getPackageFullMetadata(key, this.content[key]);
		const result = [];
		this.#whyRecursive(packageMetadata, [], result);
		return result;
	}

	write() {
		if (this.hasChanged) {
			fs.writeFileSync(this.yarnLockPath, yarnpkg.stringify(this.content));
		}
	}
}

function createYarnLockManager(filePath) {
	return new YarnLock(filePath);
}

/** @returns function to filter */
function getFilterInLockFile(opts) {
	return key =>
		(opts.scope && key.startsWith(`${opts.scope}/`)) ||
		(opts.package && key.startsWith(`${opts.package}@`)) ||
		(opts.startsWith && key.startsWith(opts.startsWith));
}

function removeFromLockFile(opts) {
	const yarnLock = createYarnLockManager(path.join(CWD, 'yarn.lock'));
	Object.keys(yarnLock.content)
		.filter(getFilterInLockFile(opts))
		.forEach(key => console.log(yarnLock.remove(key)));
	yarnLock.write();
}

function getYarnDedupBin() {
	const mod = require.resolve('yarn-deduplicate');
	const nodeModules = mod.split('yarn-deduplicate')[0];
	const pkgJson = JSON.parse(
		fs.readFileSync(path.join(nodeModules, 'yarn-deduplicate', 'package.json')),
	);
	return path.join(nodeModules, 'yarn-deduplicate', pkgJson.bin);
}

export default {
	removeFromLockFile,
	getYarnDedupBin,
	parseKey,
	createYarnLockManager,
};
