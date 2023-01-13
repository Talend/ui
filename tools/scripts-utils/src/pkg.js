const fs = require('fs');
const path = require('path');

function hasDependencies(pkg, name) {
	let found = false;
	if (pkg.dependencies) {
		found = found || !!pkg.dependencies[name];
	}
	if (pkg.devDependencies) {
		found = found || !!pkg.devDependencies[name];
	}
	if (pkg.peerDependencies) {
		found = found || !!pkg.peerDependencies[name];
	}
	return found;
}

function hasPackageInstalled(name) {
	try {
		require(name);
		return true;
	} catch (e) {}
}

function checkPackageIsInstalled(name) {
	if (!hasPackageInstalled(name)) {
		const msg = `Package ${name} is missing for the needed scripts. Please install it in your devDependencies`;
		console.error(msg);
		throw new Error(msg);
	}
}

function getPackageType() {
	const isApp = fs.existsSync(path.join(process.cwd(), 'src/app'));
	const pkgJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json')));
	const isAngular = hasDependencies(pkgJSON, 'angular');
	const isReact = hasDependencies(pkgJSON, 'react');
	const isNodeExpress = hasDependencies(pkgJSON, 'express');
	const isPublic = pkgJSON?.publishConfig?.access === 'public';
	return {
		isLib: !isApp,
		isApp,
		isReact,
		isAngular,
		isPublic,
		isNodeExpress,
	};
}

module.exports = {
	hasDependencies,
	hasPackageInstalled,
	checkPackageIsInstalled,
	getPackageType,
};
