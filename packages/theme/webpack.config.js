const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = () => {
	return {
		entry: './src/index.js',
		devtool: 'source-map',
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
					loader: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [
							{
								loader: 'css-loader',
								options: {
									importLoaders: 3,
									minimize: true,
									sourceMap: false,
								},
							},
							{
								loader: 'postcss-loader',
								options: {
									plugins: () => [
										autoprefixer({
											browsers: ['>0.25%', 'IE 11', 'not op_mini all'],
										}),
									],
								},
							},
							{
								loader: 'sass-loader',
								options: {
									sourceMap: true,
								},
							},
						],
					}),
				},
			],
		},
		devtool: 'source-map',
		plugins: [
			/**
			 * Loader options plugin helps people move from webpack 1 to webpack 2.
			 * @reference https://webpack.js.org/plugins/loader-options-plugin
			 */
			new webpack.LoaderOptionsPlugin({
				options: {
					context: __dirname,
				},
			}),
			new ExtractTextPlugin({
				filename: 'bootstrap.css',
				allChunks: true,
			}),
		],
		devServer: {
			inline: true,
			noInfo: true,
			contentBase: `${__dirname}/example`,
			watchContentBase: true,
			watchOptions: {
				poll: true,
			},
		},
	};
};
