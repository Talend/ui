import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { createUserConfigGetter } from './env.js';

const require = createRequire(import.meta.url);

/**
 * Get the preset arguments
 * @param env Then environment object. It takes the current process env if not provided.
 */
export function getPresetApi(env = process.env) {
	const mode = env.TALEND_MODE || 'production';
	const getUserConfig = createUserConfigGetter(env);
	return {
		mode,
		getUserConfig,
	};
}

function hasDep(pkg, name) {
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

export function hasPackageInstalled(name) {
	try {
		require(name);
		return true;
	} catch (e) {}
}

export function check(name) {
	if (!hasPackageInstalled(name)) {
		throw new Error(
			`Package ${name} is missing for the needed scripts. Please install it in your devDependencies`,
		);
	}
}

export function getPresetEnv() {
	const isApp = fs.existsSync(path.join(process.cwd(), 'src/app'));
	const pkgJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json')));
	const isAngular = hasDep(pkgJSON, 'angular');
	const isReact = hasDep(pkgJSON, 'react');
	const isPublic = pkgJSON?.publishConfig?.access === 'public';
	return {
		isLib: !isApp,
		isApp,
		isReact,
		isAngular,
		isPublic,
	};
}

export function getConfigurationPackage() {}
