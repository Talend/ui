/* eslint-disable import/extensions */
import spawn from 'cross-spawn';
import path from 'path';
import { resolveBin, getPkgRootPath } from '../utils/path-resolver.js';
import { getUserConfigFile } from '../utils/env.js';
import { getPresetEnv } from '../utils/preset.js';
import testNg from './test-ng.js';

const jest = resolveBin('jest');

export default async function test(env, presetApi, options) {
	const packageType = getPresetEnv();
	if (packageType.isAngular) {
		return testNg(env, presetApi, options);
	}
	const configPath = getPkgRootPath('@talend/scripts-config-jest');
	const jestConfigPath =
		getUserConfigFile('jest.config.js') || path.join(configPath, 'jest.config.js');

	return spawn.sync(jest, ['--config', jestConfigPath].concat(options), { stdio: 'inherit', env });
}
