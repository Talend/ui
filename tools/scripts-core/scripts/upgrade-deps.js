/* eslint-disable import/extensions */
import spawn from 'cross-spawn';
import { resolveBin } from '../utils/path-resolver.js';

const upgrade = resolveBin('@talend/upgrade-deps', { executable: 'talend-upgrade-deps' });

export default function upgradeDeps(env, _, options) {
	try {
		return spawn.sync(upgrade, options, { stdio: 'inherit', env });
	} catch (error) {
		console.error(error);
	}
	return undefined;
}
