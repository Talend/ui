/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = (env, argv) => {
	const isDev = argv.mode === 'development';
	return {
		mode: isDev ? 'development' : 'production',
		entry: './src/index.js',
		output: {
			filename: 'bootstrap.js',
			path: path.resolve(__dirname, './dist'),
			library: 'TalendBootstrapTheme',
			libraryTarget: 'umd',
			globalObject: 'this',
		},
		module: {
			rules: [
				{
					test: /\.woff(2)?(\?[a-z0-9=&.]+)?$/,
					use: [
						{
							loader: require.resolve('file-loader'),
							options: {
								outputPath: 'fonts',
								name: '[name].[ext]',
								esModule: false,
							},
						},
					],
				},
				{
					test: /bootstrap\.scss$/,
					use: [
						{
							loader: isDev ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
						},
						{
							loader: require.resolve('css-loader'),
							options: {
								importLoaders: 3,
								sourceMap: true,
							},
						},
						{
							loader: require.resolve('postcss-loader'),
							options: {
								postcssOptions: {
									plugins: [postcssPresetEnv({ browsers: 'last 2 versions' })],
								},
								sourceMap: true,
							},
						},
						{
							loader: require.resolve('sass-loader'),
							options: {
								sourceMap: true,
								sassOptions: { includePaths: ['./node_modules', '../../node_modules'] },
							},
						},
					],
				},
			],
		},
		devtool: 'source-map',
		optimization: {
			minimizer: [new CssMinimizerPlugin()],
		},
		plugins: [
			new CopyPlugin({
				patterns: [
					{
						from: 'dependencies.json',
						to: 'bootstrap.js.dependencies.json',
					},
				],
			}),
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, './example/index.html'),
			}),
			isDev
				? new webpack.HotModuleReplacementPlugin()
				: new MiniCssExtractPlugin({
						filename: 'bootstrap.css',
					}),
		],
		devServer: {
			port: 1234,
			historyApiFallback: true,
			static: {
				directory: path.join(process.cwd(), 'dist'),
			},
			compress: true,
			hot: true,
		},
	};
};
