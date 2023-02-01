const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { DuplicatesPlugin } = require('inspectpack/plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const cdn = require('@talend/scripts-config-cdn');

const utils = require('@talend/scripts-utils');

const {
	getCommonStyleLoaders,
	getSassLoaders,
	getJSAndTSLoader,
	getSassData,
	getAssetsRules,
} = require('./webpack.config.common');

cdn.configureTalendModules();

module.exports = options => {
	const dcwpConfig = options.getUserConfig('dynamic-cdn-webpack-plugin');
	const cssModulesEnabled = options.getUserConfig(['css', 'modules'], true);
	const userCopyConfig = options.getUserConfig('copy', []);
	const useTypescript = utils.fs.tsConfig();
	const userSassData = options.getUserConfig('sass', {});
	const sassData = getSassData(userSassData);
	const isEnvProd = options.mode === 'production';

	return (env = {}) => {
		const name = (env && env.umd) || 'Talend';
		return {
			mode: options.mode,
			optimization: {
				minimize: isEnvProd,
			},
			entry: './src/index',
			output: {
				path: path.join(process.cwd(), './dist'),
				filename: isEnvProd ? `${name}.min.js` : `${name}.js`,
				library: name,
				libraryTarget: 'umd',
				globalObject: 'this',
			},
			devtool: 'source-map',
			resolve: {
				extensions: ['.js', useTypescript && '.ts', useTypescript && '.tsx'].filter(Boolean),
				fallback: {
					url: false,
				},
			},
			module: {
				rules: [
					{
						test: useTypescript ? /\.(js|ts|tsx)$/ : /\.js$/,
						exclude: /node_modules/,
						use: getJSAndTSLoader(env, useTypescript),
					},
					{
						test: /\.scss$/,
						use: getSassLoaders(cssModulesEnabled, sassData, false),
					},
					{
						test: /\.css$/,
						use: getCommonStyleLoaders(false, false),
					},
					...getAssetsRules(false),
				],
			},
			stats: { children: false }, // remove warnings of all plugins ...
			plugins: [
				new DuplicatesPlugin(),
				new CircularDependencyPlugin({
					exclude: /node_modules/,
					cwd: process.cwd(),
					failOnError: true,
				}),
				new BundleAnalyzerPlugin({
					analyzerMode: 'static',
					openAnalyzer: false,
					logLevel: 'error',
					defaultSizes: 'stat',
					reportFilename: isEnvProd ? `${name}.min.js.report.html` : `${name}.js.report.html`,
				}),
				new MiniCssExtractPlugin({
					filename: isEnvProd ? `${name}.min.css` : `${name}.css`,
					chunkFilename: isEnvProd ? `${name}.min.css` : `${name}.css`,
				}),
				cdn.getWebpackPlugin(env, dcwpConfig),
				userCopyConfig.length > 0 && new CopyWebpackPlugin({ patterns: userCopyConfig }),
			].filter(Boolean),
		};
	};
};
