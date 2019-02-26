const path = require('path');
const spawn = require('cross-spawn');
const rimraf = require('rimraf');
const cpx = require('cpx');
const { resolveBin } = require('../utils/path-resolver');
const { getPreset } = require('../utils/preset');

const babel = resolveBin('@babel/cli', { executable: 'babel' });

module.exports = function build(env, presetApi, options) {
	const presetName = presetApi.getUserConfig(['preset'], 'talend');
	const preset = getPreset(presetName);
	const babelConfigPath = preset.getBabelConfigurationPath(presetApi);

	const srcFolder = path.join(process.cwd(), 'src');
	const targetFolder = path.join(process.cwd(), 'lib');

	rimraf.sync(targetFolder);
	spawn.sync(babel, ['--config-file', babelConfigPath, '-d', targetFolder, srcFolder, ...options], {
		stdio: 'inherit',
		env,
	});
	rimraf.sync(`${targetFolder}/**/*.test.js`);
	cpx.copySync(`${srcFolder}/**/*.{scss,json}`, targetFolder);
	return { status: 0 };
};
