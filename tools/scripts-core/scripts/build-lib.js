/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import cpx from 'cpx2';

import { getPkgRootPath, resolveBin } from '../utils/path-resolver.js';
import { getUserConfigFile } from '../utils/env.js';
import { mySpawn } from '../utils/spawn.js';

const babel = resolveBin('@babel/cli', { executable: 'babel' });
const tsc = resolveBin('typescript', { executable: 'tsc' });
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
	const babelRootPath = getPkgRootPath('@talend/scripts-config-babel');
	const tsRootPath = getPkgRootPath('@talend/scripts-config-typescript');
	const babelConfigPath =
		getUserConfigFile(['.babelrc', '.babelrc.json', 'babel.config.js']) ||
		path.join(babelRootPath, '.babelrc.json');
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
		new Promise(async (resolve, reject) => {
			if (useTsc) {
				resolve({ status: 0 });
				return;
			}
			console.log('Compiling with babel...');
			const babelSpawn = await mySpawn(
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

	const tscPromise = () =>
		new Promise(async (resolve, reject) => {
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
			const tscSpawn = await mySpawn(tsc, args, { stdio: 'inherit', env });

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

	return Promise.all([babelPromise(), tscPromise(), copyPromise()])
		.then(() => {
			console.log('🎉 Build complete');
		})
		.catch(e => {
			console.error(e);
		});
}
