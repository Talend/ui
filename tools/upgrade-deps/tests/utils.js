/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const cpx = require('cpx2');
const semver = require('semver');
const yarnpkg = require('@yarnpkg/lockfile');
const rimraf = require('rimraf');

function getTmpDirectory(prefix, fixturePath, lock) {
	const date = new Date();
	const tmp = path.join(
		__dirname,
		`tmp-${prefix}-${date.toLocaleDateString().replace(/\//g, '-')}`,
	);
	cpx.copySync(path.join(fixturePath, '**'), tmp);
	if (lock === 'yarn.lock') {
		fs.renameSync(path.join(tmp, 'yarn-template.lock'), path.join(tmp, 'yarn.lock'));
		rimraf.sync(path.join(tmp, 'package-lock.json.tpl'));
	} else {
		fs.renameSync(path.join(tmp, 'package-lock.json.tpl'), path.join(tmp, 'package-lock.json'));
		rimraf.sync(path.join(tmp, 'yarn-template.lock'));
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

function isMajorGT(pkg, pkgJsona, pkgJsonb) {
	const reqa = pkgJsona.dependencies[pkg] || pkgJsona.devDependencies[pkg];
	const reqb = pkgJsonb.dependencies[pkg] || pkgJsonb.devDependencies[pkg];
	return (
		semver.major(getVersionFromRequirement(reqa)) > semver.major(getVersionFromRequirement(reqb))
	);
}

function isMinorGt(pkg, pkgJsona, pkgJsonb) {
	const reqa = pkgJsona.dependencies[pkg] || pkgJsona.devDependencies[pkg];
	const reqb = pkgJsonb.dependencies[pkg] || pkgJsonb.devDependencies[pkg];
	return (
		semver.gt(getVersionFromRequirement(reqa), getVersionFromRequirement(reqb)) &&
		!isMajorGT(pkg, pkgJsona, pkgJsonb)
	);
}

function isSameVersion(pkg, pkgJsona, pkgJsonb) {
	const reqa = pkgJsona.dependencies[pkg] || pkgJsona.devDependencies[pkg];
	const reqb = pkgJsonb.dependencies[pkg] || pkgJsonb.devDependencies[pkg];
	return getVersionFromRequirement(reqa) === getVersionFromRequirement(reqb);
}

function isSameLockVersion(pkg, locka, lockb) {
	return getVersionFromLock(pkg, locka) === getVersionFromLock(pkg, lockb);
}
function isMinorLockGT(pkg, locka, lockb) {
	const va = getVersionFromLock(pkg, locka);
	const vb = getVersionFromLock(pkg, lockb);
	const ok = semver.gt(va, vb);
	if (!ok) {
		console.log(`${pkg} ${va} !semver.gt ${vb}`);
	}
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
