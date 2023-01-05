const { getPreset } = require('../utils/preset.cjs');

/**
 * This function downloads custom talend-build on the CDN to
 * put them inside your node_modules
 * so they are well resolved in the webpack-copy-plugin configuration
 */
module.exports = function postInstall(env, presetApi, options) {
	const presetName = presetApi.getUserConfig(['preset'], '@talend/scripts-preset-react-lib');
	const preset = getPreset(presetName);
	return preset.postInstall(options);
};
