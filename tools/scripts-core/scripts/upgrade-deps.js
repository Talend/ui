const spawn = require('cross-spawn');
const { resolveBin } = require('../utils/path-resolver');

const upgrade = resolveBin('@talend/upgrade-deps', { executable: 'talend-upgrade-deps' });

module.exports = function upgradeDeps(env, _, options) {
	try {
		return spawn.sync(
			upgrade,
			options,
			{ stdio: 'inherit', env },
		);
	} catch(error) {
		console.error(error);
	}
	return undefined;
};
