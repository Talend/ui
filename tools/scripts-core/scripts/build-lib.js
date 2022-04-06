const path = require('path');
const spawn = require('cross-spawn');
const rimraf = require('rimraf');
const cpx = require('cpx2');
const { resolveBin } = require('../utils/path-resolver');
const { getPreset } = require('../utils/preset');
const { getUserConfigFile } = require('../utils/env');

const babel = resolveBin('@babel/cli', { executable: 'babel' });

module.exports = function build(env, presetApi, options) {
	const presetName = presetApi.getUserConfig(['preset'], 'talend');
	const preset = getPreset(presetName);
	const babelConfigPath =
		getUserConfigFile(['.babelrc', '.babelrc.json', 'babel.config.js']) ||
		preset.getBabelConfigurationPath(presetApi);

	const srcFolder = path.join(process.cwd(), 'src');
	const targetFolder = path.join(process.cwd(), 'lib');

	console.log(`Removing target folder (${targetFolder})...`);
	rimraf.sync(targetFolder);

	console.log('Compiling with babel...');
	spawn.sync(
		babel,
		[
			'--config-file',
			babelConfigPath,
			'-d',
			targetFolder,
			srcFolder,
			'--source-maps',
			'--ignore',
			'**/*.test.js,**/*.stories.js',
			...options,
		],
		{
			stdio: 'inherit',
			env,
		},
	);

	console.log('Copying assets...');
	cpx.copySync(`${srcFolder}/**/*.{scss,json}`, targetFolder);

	console.log('🎉 Build complete');
	return { status: 0 };
};
