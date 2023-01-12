const spawn = require('cross-spawn');
const { resolveBin } = require('../utils/path-resolver');
const { getPreset } = require('../utils/preset');

const buildStorybook = resolveBin('storybook');

module.exports = function build(env, presetApi, options) {
	const presetName = presetApi.getUserConfig(['preset'], '@talend/scripts-preset-react-lib');
	const preset = getPreset(presetName);
	const sbConfigPath = preset.getStorybookConfigurationPath(presetApi);

	return spawn.sync(buildStorybook, ['build', '-c', sbConfigPath].concat(options), {
		stdio: 'inherit',
		env,
	});
};
