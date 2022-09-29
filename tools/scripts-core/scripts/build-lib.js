/* eslint-disable no-console */
const path = require('path');
const spawn = require('cross-spawn');
const rimraf = require('rimraf');
const cpx = require('cpx2');
const { resolveBin } = require('../utils/path-resolver');
const { getPreset } = require('../utils/preset');
const { getUserConfigFile } = require('../utils/env');

const babel = resolveBin('@babel/cli', { executable: 'babel' });
const sass = resolveBin('@talend/babel-plugin-import-scss', { executable: 'talend-scss' });

module.exports = function build(env, presetApi, options) {
	const presetName = presetApi.getUserConfig(['preset'], '@talend/scripts-preset-react-lib');
	const preset = getPreset(presetName);
	const babelConfigPath =
		getUserConfigFile(['.babelrc', '.babelrc.json', 'babel.config.js']) ||
		preset.getBabelConfigurationPath(presetApi);

	const srcFolder = path.join(process.cwd(), 'src');
	const targetFolder = path.join(process.cwd(), 'lib');

	console.log(`Removing target folder (${targetFolder})...`);
	rimraf.sync(targetFolder);

	console.log('Compiling with babel...');
	return new Promise((resolve, reject) => {
		const babelSpawn = spawn(
			babel,
			[
				'--config-file',
				babelConfigPath,
				'-d',
				targetFolder,
				srcFolder,
				'--source-maps',
				'--plugins=@talend/babel-plugin-import-scss',
				'--ignore',
				'**/*.test.js,**/*.stories.js',
				...options,
			],
			{
				stdio: 'inherit',
				env,
			},
		);
		babelSpawn.on('exit', status => {
			if (parseInt(status, 10) !== 0) {
				console.error(`Babel exit error: ${status}`);
				reject(new Error(status));
			} else {
				console.log(`babel exit: ${status}`);
				console.log('Copying assets...');
				cpx.copySync(`${srcFolder}/**/*.{json}`, targetFolder);
				console.log('Compiling with sass...');
				const sassSpawn = spawn(sass, [srcFolder, targetFolder], { stdio: 'inherit', env });
				sassSpawn.on('exit', sassStatus => {
					if (parseInt(sassStatus, 10) !== 0) {
						console.error(`sass exit error: ${sassStatus}`);
						reject(new Error(sassStatus));
					} else {
						console.log(`sass exit: ${sassStatus}`);
						console.log('🎉 Build complete');
						resolve({ status });
					}
				});
			}
		});
	});
};
