/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */

const fs = require('fs');
const moduleToCdn = require('@talend/module-to-cdn');
const util = require('util');
const path = require('path');
const { exec } = require('child_process');
const mkdirp = require('mkdirp');
const globalCleanup = require('./clean');
const getInfo = require('./getInfo');

function isScopedPackageName(packageName) {
	return packageName.startsWith('@');
}
const execProm = util.promisify(exec);

const CWD = process.cwd();
const DIST = 'dist';

async function cleanup(moduleName, version) {
	await execProm(`rm ${CWD}/${DIST}/${moduleName}/${version}.tgz`);
	await execProm(`rm -rf ${CWD}/${DIST}/${moduleName}/package`);
}

async function download(args) {
	const { packages, getVersions, program } = getInfo(args);

	console.log('Starting...');
	const promises = [];

	for (let jindex = 0; jindex < packages.length; jindex++) {
		const importPath = packages[jindex];
		const moduleName = moduleToCdn.getModuleName(importPath);
		const downloadVersions = getVersions(importPath);
		if (!program.package && !program.from) {
			let cmd = `talend-cdn download -p ${moduleName}`;
			if (program.force) {
				cmd += ' -f';
			}
			if (args.verbose) {
				cmd += ' -v';
				console.log('trigger', cmd);
			}
			if (args.exclude) {
				cmd += ` --exclude "${args.exclude}"`;
			}
			if (args.versions) {
				cmd += ` --versions "${args.versions}"`;
			}
			if (args.umd) {
				cmd += ` --umd "${args.umd}"`;
			}

			const prom = execProm(cmd, {
				cwd: process.cwd(),
			}).then(({ stdout, stderr }) => {
				if (stderr) {
					console.error('ERROR', stderr);
				}
				if (stdout && program.verbose) {
					console.log(stdout);
				}
			});
			promises.push(prom);
			continue;
		}
		console.log('importPath', importPath);

		for (let index = 0; index < downloadVersions.length; index++) {
			const version = downloadVersions[index];
			const cdnConfig = moduleToCdn(importPath, version, { env: 'production' });

			if (!cdnConfig.path && program.verbose) {
				console.error('❌ no url found for', moduleName, version);
				continue;
			}
			if (cdnConfig.url.includes('/talend-umds/')) {
				// custom build
				continue;
			}
			if (fs.existsSync(`${CWD}/${DIST}/${moduleName}/${version}${cdnConfig.path}`)) {
				if (program.force) {
					try {
						await execProm(`rm -rf ${CWD}/${DIST}/${moduleName}/${version}`, {
							cwd: process.cwd(),
						});
					} catch (e) {
						console.error(e);
					}
				} else {
					continue;
				}
			}
			const tarballName = isScopedPackageName(moduleName) ? moduleName.split('/')[1] : moduleName;

			const url = `https://registry.npmjs.org/${moduleName}/-/${tarballName}-${version}.tgz`;
			if (!fs.existsSync(`${CWD}/${DIST}/${moduleName}`)) {
				mkdirp.sync(`${CWD}/${DIST}/${moduleName}`);
			}
			console.log(`curl ${url}`);
			let curlOpts = '';
			if (process.env.NPM_TOKEN) {
				curlOpts = `-H "Authorization: Bearer ${process.env.NPM_TOKEN}"`;
			}
			try {
				await execProm(`curl ${curlOpts} ${url} > dist/${moduleName}/${version}.tgz`, {
					cwd: process.cwd(),
				});
				if (program.verbose) {
					console.log('downloaded');
				}
			} catch (e) {
				console.error(e);
			}
			if (program.verbose) {
				console.log(`tar ${url}`);
			}
			try {
				await execProm(`tar -xf ${version}.tgz`, { cwd: `${CWD}/${DIST}/${moduleName}` });
				const folder = path.dirname(cdnConfig.path);
				const parent = folder === '/' ? '' : '/..';
				await execProm(`mkdir -p ${version}${folder}`, { cwd: `${CWD}/${DIST}/${moduleName}` });

				await execProm(`cp -R package${folder}* ${version}${folder}${parent}`, {
					cwd: `${CWD}/${DIST}/${moduleName}`,
				});
				if (program.verbose) {
					console.log('extracted');
				}
			} catch (e) {
				console.error(url, e);
			}
			try {
				await cleanup(moduleName, version, cdnConfig);
			} catch (e) {
				console.error(e);
			}
		}
	}
	if (promises.length > 0) {
		await Promise.all(promises).catch(e => console.error(e));
	}
	if (args.cleanup) {
		await globalCleanup(args);
	}
}

module.exports = download;
