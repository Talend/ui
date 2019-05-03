/* eslint-disable global-require */

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
 * @param presetName The preset name
 * @returns {*} The preset
 */
function getPreset(presetName) {
	if (presetName === 'talend') {
		return require('../preset/preset-talend');
	}
	return require(`talend-scripts-preset-${presetName}`);
}

module.exports = {
	getPreset,
	getPresetApi,
};
