/**
 * Goal of this script is to take a set of libraries and build their UMDs
 */
/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */

const moduleToCdn = require('@talend/module-to-cdn');
const mkdirp = require('mkdirp');
const cpx = require('cpx2');
const rimraf = require('rimraf');
const fs = require('fs');
const util = require('util');
const { exec } = require('child_process');
const path = require('path');
const getInfo = require('./getInfo');

const execProm = util.promisify(exec);
const rmProm = util.promisify(rimraf);
const cpProm = util.promisify(cpx.copy);

const ROOT = 'dist';
const TARGET = 'talend-umds';

async function cleanup(packagePath, version) {
	try {
		await rmProm(`${packagePath}/${version}/node_modules`);
		await rmProm(`${packagePath}/${version}/package.json`);
		await rmProm(`${packagePath}/${version}/package-lock.json`);
		await rmProm(`${packagePath}/${version}/webpack.config.js`);
		await rmProm(`${packagePath}/${version}/webpack.index.js`);
	} catch (error) {
		console.error(error);
	}
}

async function main(args) {
	if (!fs.existsSync(ROOT)) {
		mkdirp.sync(ROOT);
	}
	const { config, packages, getVersions, program } = getInfo(args);

	for (let index = 0; index < packages.length; index++) {
		const importPath = packages[index];
		console.log('process', importPath);

		const versions = getVersions(importPath);

		for (let jindex = 0; jindex < versions.length; jindex++) {
			const version = versions[jindex];
			if (version.includes('-')) {
				continue;
			}
			const packageCdnConfig = moduleToCdn(importPath, version, { env: 'production' });
			const packageName = packageCdnConfig.name;
			const UMDName = packageCdnConfig.var;
			const packagePath = `${ROOT}/${packageName}`;
			const packageJsonPath = `${packagePath}/${version}/package.json`;
			const patchPath = `${__dirname}/patch/${packageName}/${version}`;
			const UMDFileName = packageCdnConfig.path.replace(`/${TARGET}/`, '');

			if (
				fs.existsSync(`${packagePath}/${version}/${TARGET}/${UMDFileName}`) &&
				!program.force
			) {
				await cleanup(packagePath, version);
				continue;
			}

			if (!fs.existsSync(`${packagePath}/${version}`)) {
				mkdirp.sync(`${packagePath}/${version}`);
			}

			const devDependencies = {
				'd3': '^6.5.0' // so we can support d3-x babel plugin
			};

			if (packageName.includes('react') || packageName.includes('rc-')) {
				devDependencies.react = '^16.0.0';
				devDependencies['react-dom'] = '^16.0.0';
			}

			if (config[packageName].peerDependencies) {
				Object.assign(devDependencies, config[packageName].peerDependencies);
			}

			const pjson = {
				name: `@talend/${UMDName}`,
				devDependencies,
				dependencies: { [packageName]: version },
			};

			if (!fs.existsSync(packageJsonPath)) {
				if (fs.existsSync(`${patchPath}/package.json`)) {
					// eslint-disable-next-line no-await-in-loop
					await cpProm(`${patchPath}/package.json`, packageJsonPath.replace('package.json', ''));
				} else {
					fs.writeFileSync(packageJsonPath, JSON.stringify(pjson, null, 2));
				}
			}

			if (!fs.existsSync(`${packagePath}/${version}/webpack.config.js`)) {
				fs.writeFileSync(
					`${packagePath}/${version}/webpack.config.js`,
					`
const path = require('path');
const cdn = require('@talend/scripts-config-cdn');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

cdn.init();

module.exports = {
  entry: path.resolve(__dirname, './webpack.index.js'),
  mode: 'production',
  optimization: {
   minimize: true,
  },
  devtool: 'source-map',
  output: {
    filename: '${UMDFileName}',
    path: path.resolve(__dirname, '${TARGET}'),
    library: '${UMDName}',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
	rules: [
		{
			test: /\.js$/,
			use: {
				loader: 'babel-loader',
				options: {
					plugins: ['@talend/babel-plugin-import-d3']
				}
			},
			include: /(${packageName})/
		}
	],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      logLevel: 'error',
      reportFilename: '${UMDName}.min.js.report.html',
    }),
    cdn.getWebpackPlugin({})
  ],
};
				`,
				);
			}
			if (!fs.existsSync(`${packagePath}/${version}/webpack.index.js`)) {
				fs.writeFileSync(
					`${packagePath}/${version}/webpack.index.js`,
					`export { default } from '${packageName}';
					export * from '${packageName}';
					`
				);
			}

			console.log(`npm i ${packageName} ${version}`);
			try {
				await execProm('npm i', { cwd: path.resolve(`./${packagePath}/${version}`) });
			} catch (error) {
				console.error(error);
				return;
			}
			const info = require(`${process.cwd()}/${packagePath}/${version}/node_modules/${packageName}/package.json`);
			if (info.peerDependencies) {
				pjson.devDependencies = Object.keys(info.peerDependencies).reduce((acc, key) => {
					acc[key] = info.peerDependencies[key];
					return acc;
				}, pjson.devDependencies || {});
				fs.writeFileSync(`${packagePath}/${version}/package.json`, JSON.stringify(pjson, null, 2));
				try {
					await execProm('npm i', { cwd: path.resolve(`./${packagePath}/${version}`) });
				} catch (error) {
					console.error(error);
				}
			}

			if (program.webpack) {
				console.log('webpack umd');
				try {
					await execProm(`webpack --config ./${packagePath}/${version}/webpack.config.js`);
				} catch (error) {
					console.error(error);
					return;
				}
			}
			if (program.copy && packageCdnConfig.path) {
				let dirName = `${path.dirname(packageCdnConfig.path)}/`;
				if (dirName === '//') {
					dirName = '/';
				}
				console.log('copy content from', dirName);
				try {
					await cpProm(
						`./${packagePath}/${version}/node_modules/${packageName}${dirName}**/*.{js,png,jpg,jpeg,json,css,woff,woff2,svg}`,
						`./${packagePath}/${version}${dirName}`,
						{ preserve: true },
					);
				} catch (error) {
					console.error(error);
					return;
				}
			}

			console.log('cleanup');
			await cleanup(packagePath, version);
		}
	}
}

module.exports = main;
