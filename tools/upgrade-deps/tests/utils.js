/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const fsProm = require('fs/promises');
const { exec } = require('child_process');
const cpx = require('cpx2');
const semver = require('semver');
const yarnpkg = require('@yarnpkg/lockfile');
const rimraf = require('rimraf');
const util = require('util');

const execProm = util.promisify(exec);
const cpxProm = util.promisify(cpx.copy);
const removeProm = util.promisify(rimraf);

async function getTmpDirectory(prefix, fixturePath, lock = 'yarn.lock') {
	const date = new Date();
	const tmp = path.join(
		__dirname,
		`tmp-${prefix}-${lock}-${date.toLocaleDateString().replace(/\//g, '-')}`,
	);
	await cpxProm(path.join(fixturePath, '**'), tmp);
	if (lock === 'yarn.lock') {
		await fsProm.rename(path.join(tmp, 'yarn-template.lock'), path.join(tmp, 'yarn.lock'));
		await removeProm(path.join(tmp, 'package-lock.json.tpl'));
	} else {
		await fsProm.rename(
			path.join(tmp, 'package-lock.json.tpl'),
			path.join(tmp, 'package-lock.json'),
		);
		await removeProm(path.join(tmp, 'yarn-template.lock'));
		await execProm('npm i', { cwd: tmp });
	}
	return tmp;
}

function getLockContent(folder, lockFilename) {
	let lockPath;
	if (lockFilename === 'yarn.lock') {
		lockPath = path.join(folder, 'yarn.lock');
		if (!fs.existsSync(lockPath)) {
			lockPath = path.join(folder, 'yarn-template.lock');
		}
		return yarnpkg.parse(fs.readFileSync(lockPath).toString());
	}
	lockPath = path.join(folder, 'package-lock.json');
	if (!fs.existsSync(lockPath)) {
		lockPath = path.join(folder, 'package-lock.json.tpl');
	}
	return JSON.parse(fs.readFileSync(lockPath).toString());
}

function getVersionFromRequirement(req) {
	return semver.minVersion(req).raw;
}

function getVersionFromLock(pkg, lock) {
	if (lock.object) {
		//yarn.lock
		const key = Object.keys(lock.object).find(nextKey => nextKey.startsWith(`${pkg}@`));
		return lock.object[key].version;
	}
	const key = Object.keys(lock.packages).find(nextKey => nextKey.includes(pkg));
	return lock.packages[key].version;
}

function isMajorGT(pkg, pkgJsona, pkgJsonb, attr = 'dependencies') {
	const reqa = pkgJsona[attr][pkg];
	const reqb = pkgJsonb[attr][pkg];
	return (
		semver.major(getVersionFromRequirement(reqa)) > semver.major(getVersionFromRequirement(reqb))
	);
}

function isMinorGt(pkg, pkgJsona, pkgJsonb, attr = 'dependencies') {
	const reqa = pkgJsona[attr][pkg];
	const reqb = pkgJsonb[attr][pkg];
	return (
		semver.gt(getVersionFromRequirement(reqa), getVersionFromRequirement(reqb)) &&
		!isMajorGT(pkg, pkgJsona, pkgJsonb)
	);
}

function isSameVersion(pkg, pkgJsona, pkgJsonb, attr = 'dependencies') {
	const reqa = pkgJsona[attr][pkg];
	const reqb = pkgJsonb[attr][pkg];
	return getVersionFromRequirement(reqa) === getVersionFromRequirement(reqb);
}

function isSameLockVersion(pkg, locka, lockb) {
	return getVersionFromLock(pkg, locka) === getVersionFromLock(pkg, lockb);
}
function isMinorLockGT(pkg, locka, lockb) {
	const va = getVersionFromLock(pkg, locka);
	const vb = getVersionFromLock(pkg, lockb);
	const ok = semver.gt(va, vb);
	return ok;
}
function isMajorLockGT(pkg, locka, lockb) {
	return (
		semver.major(getVersionFromLock(pkg, locka)) > semver.major(getVersionFromLock(pkg, lockb))
	);
}

module.exports = {
	getLockContent,
	getTmpDirectory,
	getVersionFromRequirement,
	getVersionFromLock,
	isMajorGT,
	isMinorGt,
	isSameVersion,
	isSameLockVersion,
	isMinorLockGT,
	isMajorLockGT,
};
