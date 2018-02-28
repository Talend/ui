/* eslint-disable global-require */

const { createUserConfigGetter } = require('./env');
const { hereRelative } = require('./path-resolver');

/**
 * Get the preset arguments
 * @param env Then environment object. It takes the current process env if not provided.
 */
function getPresetApi(env = process.env) {
	const mode = process.env.TALEND_MODE || 'production';
	const getUserConfig = createUserConfigGetter();
	return {
		mode,
		getUserConfig,
		hereRelative,
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
