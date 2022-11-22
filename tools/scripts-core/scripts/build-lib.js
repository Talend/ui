/* eslint-disable no-console */
const path = require('path');
const spawn = require('cross-spawn');
const rimraf = require('rimraf');
const cpx = require('cpx2');
const { resolveBin } = require('../utils/path-resolver');
const { getPreset } = require('../utils/preset');
const { getUserConfigFile } = require('../utils/env');

const babel = resolveBin('@babel/cli', { executable: 'babel' });

module.exports = function build(env, presetApi, options) {
	const presetName = presetApi.getUserConfig(['preset'], '@talend/scripts-preset-react-lib');
	const preset = getPreset(presetName);
	const babelConfigPath =
		getUserConfigFile(['.babelrc', '.babelrc.json', 'babel.config.js']) ||
		preset.getBabelConfigurationPath(presetApi);

	const srcFolder = path.join(process.cwd(), 'src');
	const targetFolder = path.join(process.cwd(), 'lib');

	if (!options.includes('--watch')) {
		console.log(`Removing target folder (${targetFolder})...`);
		rimraf.sync(targetFolder);
	}
	const babelPromise = () =>
		new Promise((resolve, reject) => {
			console.log('Compiling with babel...');
			const babelSpawn = spawn(
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
			babelSpawn.on('exit', status => {
				if (parseInt(status, 10) !== 0) {
					console.error(`Babel exit error: ${status}`);
					reject(new Error(status));
				} else {
					console.log(`Babel exit: ${status}`);
					resolve({ status });
				}
			});
		});

	const copyPromise = () =>
		new Promise((resolve, reject) => {
			if (options.includes('--watch')) {
				const evtEmitter = cpx.watch(`${srcFolder}/**/*.{scss,json}`, targetFolder);
				evtEmitter.on('watch-error', err => {
					reject(err);
				});
				evtEmitter.on('copy', e => {
					console.log('copy', e.srcPath, e.dstPath);
				});
			} else {
				console.log('Copying assets...');
				cpx.copy(`${srcFolder}/**/*.{scss,json}`, targetFolder, err => {
					if (err) {
						console.error(err);
						reject(error);
					} else {
						resolve();
					}
				});
			}
		});

	return Promise.all([babelPromise(), copyPromise()]).then(() => {
		console.log('🎉 Build complete');
	});
};
