/* eslint-disable import/extensions */
import spawn from 'cross-spawn';
import { resolveBin } from '../utils/path-resolver.js';
import { getPreset } from '../utils/preset.js';

const karma = resolveBin('karma');

export async function test(env, presetApi, options) {
	const presetName = presetApi.getUserConfig(['preset'], '@talend/scripts-preset-react-lib');
	const preset = await getPreset(presetName);
	const karmaConfigPath = preset.getKarmaConfigurationPath(presetApi);

	return spawn.sync(karma, ['start', karmaConfigPath].concat(options), { stdio: 'inherit', env });
}
