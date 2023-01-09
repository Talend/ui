/* eslint-disable import/extensions */
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

export function getConfigurationPackage() {}
