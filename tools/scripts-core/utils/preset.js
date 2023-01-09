/* eslint-disable import/extensions */
import fs from 'fs';
import path from 'path';
import { createUserConfigGetter } from './env.js';

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

export function getPresetEnv() {
	const isApp = fs.existsSync(path.join(process.cwd(), 'src/app'));
	const pkgJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json')));
	const isAngular = hasDep(pkgJSON, 'angular');
	const isPublic = pkgJSON?.publishConfig?.access === 'public';
	return {
		isLib: !isApp,
		isApp,
		isReact: !isAngular,
		isAngular,
		isPublic,
	};
}

export function getConfigurationPackage() {}
