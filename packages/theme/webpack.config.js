const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

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
					loader: 'url-loader',
					options: {
						limit: 10000,
						mimetype: 'application/font-woff',
						name: './fonts/[name].[ext]',
					},
				},
				{
					test: /bootstrap\.scss$/,
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
								postcssOptions: {
									ident: 'postcss',
									plugins: [['postcss-preset-env', { browsers: 'last 2 versions' }]],
								},
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
		devtool: 'source-map',
		optimization: {
			minimize: true,
			minimizer: ['...', new CssMinimizerPlugin()], // '...' used to access the defaults.
		},
		plugins: [
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
			stats: 'errors-only',
			historyApiFallback: true,
			contentBase: path.join(process.cwd(), 'dist'),
			compress: true,
			inline: true,
			hot: true,
		},
	};
};
