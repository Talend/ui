const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { getBabelConfig } = require('@talend/scripts-config-babel/babel-resolver');

const cdn = require('@talend/scripts-config-cdn');

const exists = require('./utils/exists');

const babelConfig = getBabelConfig();
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
			},
			module: {
				rules: [
					{
						test: useTypescript ? /\.(js|ts|tsx)$/ : /\.js$/,
						exclude: /node_modules/,
						use: [
							!env.nocache && { loader: 'cache-loader' },
							{
								loader: 'babel-loader',
								options: babelConfig,
							},
						].filter(Boolean),
					},
					{
						test: /\.scss$/,
						use: [
							{ loader: MiniCssExtractPlugin.loader },
							{
								loader: 'css-loader',
								options: {
									sourceMap: isEnvProd,
									...(cssModulesEnabled
										? {
												modules: {
													localIdentName: '[name]__[local]___[hash:base64:5]',
												},
												importLoaders: 1,
										  }
										: {}),
								},
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: isEnvProd,
									plugins: () => [autoprefixer()],
								},
							},
							{ loader: 'resolve-url-loader' },
							{
								loader: 'sass-loader',
								options: {
									sourceMap: isEnvProd,
									additionalData: "@use '~@talend/bootstrap-theme/src/theme/guidelines' as *;",
								},
							},
						],
					},
					{
						test: /\.css$/,
						use: [
							{ loader: MiniCssExtractPlugin.loader },
							{ loader: 'css-loader' },
							{ loader: 'postcss-loader', options: { plugins: () => [autoprefixer()] } },
							{ loader: 'resolve-url-loader' },
						],
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
			// node: {
			// 	fs: 'empty',
			// },
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
