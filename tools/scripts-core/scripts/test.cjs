const spawn = require('cross-spawn');
const { resolveBin } = require('../utils/path-resolver.cjs');
const { getPreset } = require('../utils/preset.cjs');
const { getUserConfigFile } = require('../utils/env.cjs');

const jest = resolveBin('jest');

module.exports = function test(env, presetApi, options) {
	const presetName = presetApi.getUserConfig(['preset'], '@talend/scripts-preset-react-lib');
	const preset = getPreset(presetName);
	const jestConfigPath =
		getUserConfigFile('jest.config.js') || preset.getJestConfigurationPath(presetApi);

	return spawn.sync(jest, ['--config', jestConfigPath].concat(options), { stdio: 'inherit', env });
};
