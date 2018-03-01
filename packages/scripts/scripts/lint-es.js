const spawn = require('cross-spawn');
const { resolveBin } = require('../utils/path-resolver');
const { getPreset } = require('../utils/preset');

const eslint = resolveBin('eslint');

module.exports = function lintEs(env, presetApi) {
	const presetName = presetApi.getUserConfig(['preset'], 'talend');
	const preset = getPreset(presetName);
	const eslintConfigPath = preset.getEslintConfigurationPath(presetApi);

	return spawn.sync(
		eslint,
		[
			'--config', eslintConfigPath,
			'src/**/*.js',
		],
		{ stdio: 'inherit', env }
	);
};
