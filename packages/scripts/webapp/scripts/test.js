const spawn = require('cross-spawn');
const { resolveBin } = require('../utils/path-resolver');
const { getPreset } = require('../utils/preset');

const jest = resolveBin('jest');

module.exports = function test(env, presetApi, options) {
	const presetName = presetApi.getUserConfig(['preset'], 'talend');
	const preset = getPreset(presetName);
	const jestConfigPath = preset.getJestConfigurationPath(presetApi);

	return spawn.sync(
		jest,
		[
			'--config', jestConfigPath,
			'--no-cache',
		].concat(options),
		{ stdio: 'inherit', env }
	);
};
