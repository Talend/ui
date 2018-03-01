/* eslint-disable global-require */

/**
 * Get the preset
 * @param presetName The preset name
 * @returns {*} The preset
 */
function getPreset(presetName) {
	if (presetName === 'talend') {
		return require('../../preset/preset-talend');
	}
	return require(`talend-scripts-preset-${presetName}`);
}

module.exports = { getPreset };
