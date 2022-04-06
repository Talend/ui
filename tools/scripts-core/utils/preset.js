const { createUserConfigGetter } = require('./env');

/**
 * Get the preset arguments
 * @param env Then environment object. It takes the current process env if not provided.
 */
function getPresetApi(env = process.env) {
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
function getPreset(preset) {
	return require(preset);
}

module.exports = {
	getPreset,
	getPresetApi,
};
