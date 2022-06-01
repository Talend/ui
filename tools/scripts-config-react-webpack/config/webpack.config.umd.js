const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');

const cdn = require('@talend/scripts-config-cdn');

const exists = require('./utils/exists');

const {
	getCommonStyleLoaders,
	getSassLoaders,
	getJSAndTSLoader,
} = require('./webpack.config.common');

cdn.configureTalendModules();

module.exports = options => {
	const dcwpConfig = options.getUserConfig('dynamic-cdn-webpack-plugin');
	const cssModulesEnabled = options.getUserConfig(['css', 'modules'], true);
	const userCopyConfig = options.getUserConfig('copy', []);
	const useTypescript = exists.tsConfig();
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
						use: getSassLoaders(cssModulesEnabled, undefined, options.mode),
					},
					{
						test: /\.css$/,
						use: getCommonStyleLoaders(false, options.mode),
					},
					{
						test: /\.svg$/,
						loader: 'url-loader',
						options: {
							esModule: false,
							name: 'assets/svg/[name].[ext]',
							mimetype: 'image/svg+xml',
						},
					},
				],
			},
			stats: { children: false }, // remove warnings of all plugins ...
			plugins: [
				new BundleAnalyzerPlugin({
					analyzerMode: 'static',
					openAnalyzer: false,
					logLevel: 'error',
					reportFilename: isEnvProd ? `${name}.min.js.report.html` : `${name}.js.report.html`,
				}),
				new MiniCssExtractPlugin({
					filename: `${name}.css`,
					chunkFilename: `${name}.css`,
				}),
				cdn.getWebpackPlugin(env, dcwpConfig),
				userCopyConfig.length > 0 && new CopyWebpackPlugin({ patterns: userCopyConfig }),
			].filter(Boolean),
		};
	};
};
