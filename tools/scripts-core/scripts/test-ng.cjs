const spawn = require('cross-spawn');
const { resolveBin } = require('../utils/path-resolver.cjs');
const { getPreset } = require('../utils/preset.cjs');

const karma = resolveBin('karma');

module.exports = function test(env, presetApi, options) {
	const presetName = presetApi.getUserConfig(['preset'], '@talend/scripts-preset-react-lib');
	const preset = getPreset(presetName);
	const karmaConfigPath = preset.getKarmaConfigurationPath(presetApi);

	return spawn.sync(karma, ['start', karmaConfigPath].concat(options), { stdio: 'inherit', env });
};
