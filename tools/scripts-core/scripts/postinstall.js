/* eslint-disable import/extensions */
import { getPreset } from '../utils/preset.js';

/**
 * This function downloads custom talend-build on the CDN to
 * put them inside your node_modules
 * so they are well resolved in the webpack-copy-plugin configuration
 */
export default async function postInstall(env, presetApi, options) {
	const presetName = presetApi.getUserConfig(['preset'], '@talend/scripts-preset-react-lib');
	const preset = await getPreset(presetName);
	return preset.postInstall(options);
}
