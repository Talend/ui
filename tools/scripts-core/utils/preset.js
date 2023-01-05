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

/**
 * Get the preset
 * @param preset The preset package name
 * @returns {*} The preset
 */
export async function getPreset(preset) {
	const mod = await import(preset);
	return mod.default;
}
