const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = () => {
	return {
		entry: './src/index.js',
		output: {
			path: `${__dirname}/dist`,
			filename: 'bootstrap.js',
		},
		module: {
			rules: [
				{
					test: /\.woff(2)?(\?[a-z0-9=&.]+)?$/,
					loader: 'url-loader',
					options: {
						limit: 50000,
						mimetype: 'application/font-woff',
						name: './fonts/[name].[ext]'
					}
				},
				{
					test: /bootstrap\.scss$/,
					loader: ExtractTextPlugin.extract({
						fallbackLoader: 'style-loader',
						loader: [
							{
								loader: 'css-loader',
								query: {
									importLoaders: 3,
									minimize: true,
									sourceMap: false
								}
							},
							{
								loader: 'postcss-loader'
							},
							{
								loader: 'sass-loader',
								query: {
									sourceMap: true
								}
							},
						],
					}),
				}
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
					postcss: [
						require('autoprefixer')({
							browsers: ['last 2 versions'],
							cascade: true,
							remove: true
						}),
					]
				}
			}),
			new ExtractTextPlugin({
				filename: 'bootstrap.css',
				allChunks: true
			}),
		],
		devServer: {
			contentBase: [
				'./',
				'./example'
			],
		},
	}
};

