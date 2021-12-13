const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = (env, argv) => {
	const isDev = argv.mode === 'development';
	return {
		mode: isDev ? 'development' : 'production',
		entry: {
			TalendDesignTokens: ['./src/index.ts', './src/index.scss'],
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, './dist'),
			libraryTarget: 'umd',
			globalObject: 'this',
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.scss$/i,
					use: [
						{
							loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
						},
						{
							loader: 'css-loader',
							options: {
								importLoaders: 3,
								sourceMap: true,
							},
						},
						{
							loader: 'postcss-loader',
							options: {
								ident: 'postcss',
								plugins: [postcssPresetEnv({ browsers: 'last 2 versions' })],
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true,
							},
						},
					],
				},
			],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
		devtool: 'source-map',
		optimization: {
			minimizer: [new CssMinimizerPlugin()],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].css',
			}),
		],
	};
};
