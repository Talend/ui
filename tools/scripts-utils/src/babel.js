const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function getLockFilePath(cwd = process.cwd()) {
	const yarnlockPath = path.join(cwd, 'yarn.lock');
	const pkglockPath = path.join(cwd, 'package-lock.json');
	if (fs.existsSync(yarnlockPath)) {
		return yarnlockPath;
	} else if (fs.existsSync(pkglockPath)) {
		return pkglockPath;
	}
	const parentPath = path.join(cwd, '..');
	if (parentPath === cwd) {
		// we are at root of the system;
		throw new Error(`can't find lock file from ${process.cwd()} or in parent directories.`);
	}

	return getLockFilePath(parentPath);
}

function getHash(content) {
	return crypto.createHash('sha256').update(content).digest('base64');
}

function getLockHash() {
	const p = getLockFilePath();
	return getHash(fs.readFileSync(p));
}

function getBabelLoaderOptions(babelConfig) {
	const cacheIdentifier = getHash(
		JSON.stringify({
			babelrc: babelConfig || '',
			env: process.env.BABEL_ENV || process.env.NODE_ENV,
			lockHash: getLockHash(),
		}),
	);

	return {
		...babelConfig,
		cacheDirectory: true,
		cacheCompression: false,
		cacheIdentifier,
	};
}

module.exports = { getHash, getLockHash, getBabelLoaderOptions };
