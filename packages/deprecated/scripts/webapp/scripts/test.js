const spawn = require('cross-spawn');
const { resolveBin } = require('../utils/path-resolver');
const { getPreset } = require('../utils/preset');
const { getUserConfigFile } = require('../utils/env');

const jest = resolveBin('jest');

module.exports = function test(env, presetApi, options) {
	const presetName = presetApi.getUserConfig(['preset'], 'talend');
	const preset = getPreset(presetName);
	const jestConfigPath =
		getUserConfigFile('jest.config.js') || preset.getJestConfigurationPath(presetApi);

	return spawn.sync(jest, ['--config', jestConfigPath].concat(options), { stdio: 'inherit', env });
};
