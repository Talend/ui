/* eslint-disable import/extensions */
import spawn from 'cross-spawn';
import { resolveBin } from '../utils/path-resolver.js';
import { getPreset } from '../utils/preset.js';
import { getUserConfigFile } from '../utils/env.js';

const jest = resolveBin('jest');

export default async function test(env, presetApi, options) {
	const presetName = presetApi.getUserConfig(['preset'], '@talend/scripts-preset-react-lib');
	const preset = await getPreset(presetName);
	const jestConfigPath =
		getUserConfigFile('jest.config.js') || preset.getJestConfigurationPath(presetApi);

	return spawn.sync(jest, ['--config', jestConfigPath].concat(options), { stdio: 'inherit', env });
}
