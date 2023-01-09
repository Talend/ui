/* eslint-disable import/extensions */
import spawn from 'cross-spawn';
import path from 'path';
import { resolveBin } from '../utils/path-resolver.js';

const karma = resolveBin('karma');

export async function test(env, presetApi, options) {
	const configPath = getPkgRootPath('@talend/scripts-config-karma');
	const karmaConfigPath = path.join(configPath, 'karma.conf.js');

	return spawn.sync(karma, ['start', karmaConfigPath].concat(options), { stdio: 'inherit', env });
}
