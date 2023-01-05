const spawn = require('cross-spawn');
const { resolveBin } = require('../utils/path-resolver.cjs');

const publishLocal = resolveBin('@talend/scripts-publish-local', {
	executable: 'talend-publish-local',
});

module.exports = function spawnPublishLocal() {
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
};
