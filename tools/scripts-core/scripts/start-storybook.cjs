const spawn = require('cross-spawn');
const { resolveBin } = require('../utils/path-resolver.cjs');
const { getPreset } = require('../utils/preset.cjs');

const startStorybook = resolveBin('start-storybook');

module.exports = function start(env, presetApi, options) {
	const presetName = presetApi.getUserConfig(['preset'], '@talend/scripts-preset-react-lib');
	const preset = getPreset(presetName);
	const sbConfigPath = preset.getStorybookConfigurationPath(presetApi);

	return spawn.sync(startStorybook, ['-c', sbConfigPath].concat(options), {
		stdio: 'inherit',
		env,
	});
};
