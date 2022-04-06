const spawn = require('cross-spawn');
const { resolveBin } = require('../utils/path-resolver');
const { getPreset } = require('../utils/preset');

const karma = resolveBin('karma');

module.exports = function test(env, presetApi, options) {
	const presetName = presetApi.getUserConfig(['preset'], 'talend');
	const preset = getPreset(presetName);
	const karmaConfigPath = preset.getKarmaConfigurationPath(presetApi);

	return spawn.sync(karma, ['start', karmaConfigPath].concat(options), { stdio: 'inherit', env });
};
