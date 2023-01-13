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

export function getPresetEnv() {}
