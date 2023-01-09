/* eslint-disable import/extensions */
import spawn from 'cross-spawn';
import path from 'path';
import { resolveBin, getPkgRootPath } from '../utils/path-resolver.js';
import { getUserConfigFile } from '../utils/env.js';
import { getPresetEnv } from '../utils/preset.js';

async function testKarma(env, presetApi, options) {
	const karma = resolveBin('karma');
	const configPath = getPkgRootPath('@talend/scripts-config-karma');
	const karmaConfigPath = path.join(configPath, 'karma.conf.js');

	return spawn.sync(karma, ['start', karmaConfigPath].concat(options), { stdio: 'inherit', env });
}

export default async function test(env, presetApi, options) {
	const packageType = getPresetEnv();
	if (packageType.isAngular) {
		return testKarma(env, presetApi, options);
	}
	const configPath = getPkgRootPath('@talend/scripts-config-jest');
	const jestConfigPath =
		getUserConfigFile('jest.config.js') || path.join(configPath, 'jest.config.js');

	const jest = resolveBin('jest');
	return spawn.sync(jest, ['--config', jestConfigPath].concat(options), { stdio: 'inherit', env });
}
