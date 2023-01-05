/* eslint-disable import/extensions */
import spawn from 'cross-spawn';
import { resolveBin } from '../utils/path-resolver.js';
import { getPreset } from '../utils/preset.js';

const buildStorybook = resolveBin('build-storybook');

export default async function build(env, presetApi, options) {
	const presetName = presetApi.getUserConfig(['preset'], '@talend/scripts-preset-react-lib');
	const preset = await getPreset(presetName);
	const sbConfigPath = preset.getStorybookConfigurationPath(presetApi);

	return spawn.sync(buildStorybook, ['-c', sbConfigPath].concat(options), {
		stdio: 'inherit',
		env,
	});
}
