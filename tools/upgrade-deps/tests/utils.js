/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const cpx = require('cpx2');
const semver = require('semver');

function getTmpDirectory(prefix, fixturePath) {
	const date = new Date();
	const tmp = path.join(
		__dirname,
		`tmp-${prefix}-${date.toLocaleDateString().replace(/\//g, '-')}`,
	);
	cpx.copySync(path.join(fixturePath, '**'), tmp);
	fs.renameSync(path.join(tmp, 'yarn-template.lock'), path.join(tmp, 'yarn.lock'));
	return tmp;
}

function getVersionFromRequirement(req) {
	return semver.minVersion(req).raw;
}

function getVersionFromLock(pkg, lock) {
	const key = Object.keys(lock.object).find(nextKey => nextKey.startsWith(`${pkg}@`));
	return lock.object[key].version;
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
	return semver.gt(getVersionFromLock(pkg, locka), getVersionFromLock(pkg, lockb));
}
function isMajorLockGT(pkg, locka, lockb) {
	return (
		semver.major(getVersionFromLock(pkg, locka)) > semver.major(getVersionFromLock(pkg, lockb))
	);
}

module.exports = {
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
