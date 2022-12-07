/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const spawn = require('cross-spawn');
const rimraf = require('rimraf');
const cpx = require('cpx2');

const { resolveBin } = require('../utils/path-resolver');
const { getPreset } = require('../utils/preset');
const { getUserConfigFile } = require('../utils/env');

const babel = resolveBin('@babel/cli', { executable: 'babel' });
const tsc = resolveBin('typescript', { executable: 'tsc' });

module.exports = function build(env, presetApi, unsafeOptions) {
	let useBabel = true;
	const options = unsafeOptions.filter(f => {
		if (f === '--tsc') {
			useBabel = false;
			return false;
		}
		return true;
	});
	const presetName = presetApi.getUserConfig(['preset'], '@talend/scripts-preset-react-lib');
	const preset = getPreset(presetName);

	const babelConfigPath =
		getUserConfigFile(['.babelrc', '.babelrc.json', 'babel.config.js']) ||
		preset.getBabelConfigurationPath(presetApi);
	const tscConfigPath =
		getUserConfigFile(['tsconfig.build.json', 'tsconfig.json']) ||
		preset.getTypescriptConfigurationPath(presetApi);

	const srcFolder = path.join(process.cwd(), 'src');
	const targetFolder = path.join(process.cwd(), 'lib');

	if (!options.includes('--watch')) {
		console.log(`Removing target folder (${targetFolder})...`);
		rimraf.sync(targetFolder);
	}

	const babelPromise = () =>
		new Promise((resolve, reject) => {
			if (!useBabel) {
				resolve({ status: 0 });
			}
			console.log('Building with babel');
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
					// @see https://github.com/babel/babel/issues/12008
					'**/*.test.js,**/*.test.ts,**/*.test.tsx,**/*.spec.js,**/*.spec.ts,**/*.spec.tsx,**/*.stories.js,**/*.stories.ts,**/*.stories.tsx',
					'--extensions',
					'.js,.ts,.tsx,.jsx',
					...options,
				],
				{ stdio: 'inherit', env },
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

	const tscPromise = () =>
		new Promise((resolve, reject) => {
			let args = ['--project', tscConfigPath, '--outDir', targetFolder, ...options];
			if (useBabel) {
				args = ['--emitDeclarationOnly'].concat(args);
			}
			const tscSpawn = spawn(tsc, args, { stdio: 'inherit', env });

			tscSpawn.on('exit', status => {
				if (parseInt(status, 10) !== 0) {
					console.error(`TSC exit error: ${status}`);
					reject(new Error(status));
				} else {
					console.log(`TSC exit: ${status}`);
					const pkgPath = path.join(process.cwd(), 'package.json');
					const types = JSON.parse(fs.readFileSync(pkgPath))?.types;
					if (!types) {
						const msg = `Entry "types", referencing your declaration file (index.d.ts), must be defined in ${pkgPath}`;
						console.error(msg);
						reject(new Error(msg));
					} else {
						const absoluteTypes = path.join(process.cwd(), types);
						if (!fs.existsSync(absoluteTypes)) {
							const msg = `Declaration file, referenced in package.json, not found ${absoluteTypes}`;
							console.error(msg);
							reject(new Error(msg));
						} else {
							resolve({ status });
						}
					}
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

	return Promise.all([babelPromise(), tscPromise(), copyPromise()]).then(() => {
		console.log('🎉 Build complete');
	});
};
