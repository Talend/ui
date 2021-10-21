/* eslint-disable import/no-dynamic-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */

const path = require('path');
const webpack = require('webpack');
const resolve = require('@talend/dynamic-cdn-webpack-plugin/lib/resolve-pkg');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const mockBackend = require('./mockBackend/server');

/*
 * because we are in dev mode our webpack config do not detect cdn resources in the yarn.lock.
 * so we compute the path of the resources to copy.
 */

function getPath(pkg) {
	const pkgPath = resolve(pkg, { cwd: process.cwd() });
	return pkgPath
		.replace('lib/index.js', '')
		.replace('dist/bootstrap.js', '')
		.replace('dist/TalendIcons.js', '');
}

function getVersion(pkg) {
	return require(`${getPath(pkg)}/package.json`).version;
}

const PKGS = [
	'@talend/react-components',
	'@talend/react-containers',
	'@talend/react-cmf',
	'@talend/react-cmf-router',
	'@talend/react-forms',
	'@talend/bootstrap-theme',
	'@talend/icons',
];

const to = pkg => path.relative(process.cwd(), path.resolve(`cdn/${pkg}/${getVersion(pkg)}/dist/`));
const patterns = PKGS.map(pkg => ({
	from: path.resolve(getPath(pkg), 'dist'),
	to: `${to(pkg)}/`,
	info: { minimized: true },
}));

const webpackConfig = {
	plugins: [
		new CopyWebpackPlugin({ patterns }),
		new webpack.DefinePlugin({
			'process.env.ICONS_VERSION': JSON.stringify(getVersion('@talend/icons')),
		}),
	],
	output: {
		publicPath: '/playground',
	},
	devServer: {
		onBeforeSetupMiddleware: mockBackend,
	},
};

module.exports = webpackConfig;
