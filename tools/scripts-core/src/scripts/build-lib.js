/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import cpx from 'cpx2';
import * as utils from '@talend/scripts-utils';

import { getUserConfigFile } from '../utils/env.js';

const pkgPath = path.join(process.cwd(), 'package.json');
const types = JSON.parse(fs.readFileSync(pkgPath))?.types;
const isTSLib = !!types;

export default async function build(env, presetApi, unsafeOptions) {
	let useTsc = false;
	const options = unsafeOptions.filter(o => {
		if (o === '--tsc') {
			useTsc = true;
			// do not keep this option
			return false;
		}
		return true;
	});

	const babelRootPath = utils.path.getPkgRootPath('@talend/scripts-config-babel');
	const tsRootPath = utils.path.getPkgRootPath('@talend/scripts-config-typescript');
	const babelConfigPath =
		getUserConfigFile(['.babelrc', '.babelrc.json', 'babel.config.js']) ||
		path.join(babelRootPath, 'babel.config.js');
	const tscConfigPath =
		getUserConfigFile(['tsconfig.build.json', 'tsconfig.json']) ||
		path.join(tsRootPath, 'tsconfig.json');

	const srcFolder = path.join(process.cwd(), 'src');
	const targetFolder = path.join(process.cwd(), 'lib');

	if (!options.includes('--watch')) {
		console.log(`Removing target folder (${targetFolder})...`);
		rimraf.sync(targetFolder);
	}
	const babelPromise = () =>
		new Promise((resolve, reject) => {
			if (useTsc) {
				resolve({ status: 0 });
				return;
			}
			console.log('Compiling with babel...');
			utils.process
				.spawn(
					new URL(import.meta.resolve('@babel/cli/bin/babel.js')).pathname,
					[
						'--config-file',
						babelConfigPath,
						'-d',
						targetFolder,
						srcFolder,
						'--source-maps',
						'--ignore',
						// @see https://github.com/babel/babel/issues/12008
						'**/__mocks__,**/__tests__,**/*.test.js,**/*.test.ts,**/*.test.tsx,**/*.spec.js,**/*.spec.ts,**/*.spec.tsx,**/*.stories.js,**/*.stories.ts,**/*.stories.tsx',
						'--extensions',
						'.js,.ts,.tsx,.jsx',
						...options,
					],
					{
						stdio: 'inherit',
						env,
						shell: process.platform === 'win32',
					},
				)
				.then(babelSpawn => {
					babelSpawn.on('exit', status => {
						if (parseInt(status, 10) !== 0) {
							console.error(`Babel exit error: ${status}`);
							reject(new Error(status));
						} else {
							console.log(`Babel exit: ${status}`);
							resolve({ status });
						}
					});
				})
				.catch(error => {
					console.error('Spawn error:', error);
					reject(error);
				});
		});

	const tscPromise = () =>
		new Promise((resolve, reject) => {
			if (!isTSLib) {
				resolve({ status: 0 });
				return;
			}
			let args = ['--project', tscConfigPath, '--outDir', targetFolder, ...options];
			if (!useTsc) {
				args = ['--emitDeclarationOnly'].concat(args);
				console.log('Building types with tsc --emitDeclarationOnly');
			} else {
				console.log('Building with tsc');
			}

			const tsc = new URL(import.meta.resolve('typescript/bin/tsc')).pathname;
			console.log('####TSC', args);
			utils.process
				.spawn(tsc, args, { stdio: 'inherit', env })
				.then(tscSpawn => {
					tscSpawn.on('exit', status => {
						if (parseInt(status, 10) !== 0) {
							console.error(`TSC exit error: ${status}`);
							reject(new Error(status));
						} else {
							console.log(`TSC exit: ${status}`);
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
				})
				.catch(error => {
					console.error('Spawn error:', error);
					reject(error);
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
						reject(err);
					} else {
						resolve();
					}
				});
			}
		});

	return Promise.all([babelPromise(), tscPromise(), copyPromise()])
		.then(() => {
			console.log('🎉 Build complete');
		})
		.catch(e => {
			console.error(e);
		});
}
