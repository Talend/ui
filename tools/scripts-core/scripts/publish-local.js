/* eslint-disable import/extensions */
import spawn from 'cross-spawn';
import { resolveBin } from '../utils/path-resolver.js';

const publishLocal = resolveBin('@talend/scripts-publish-local', {
	executable: 'talend-publish-local',
});

export default function spawnPublishLocal() {
	try {
		return spawn.sync(
			publishLocal,
			process.argv.filter(a => a.startsWith('-')),
			{ stdio: 'inherit' },
		);
	} catch (error) {
		console.error(error);
	}
	return undefined;
}
