const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const SASS_DATA = `$brand-primary: #77828A;
@import '~bootstrap-talend-theme/src/theme/guidelines';
`;

module.exports = {
	entry: ['babel-polyfill', './src/app/index.js'],
	output: {
		path: `${__dirname}/build`,
		publicPath: '/',
		filename: '[hash].app.js',
	},
	resolve: ['', '.scss', '.css', 'js', 'jsx'],
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style', 'css', {
					publicPath: './',
				}),
			},
			{
				test: /theme.scss$/,
				loader: ExtractTextPlugin.extract(
					'css!postcss!sass', {
						publicPath: './',
					}
				),
			},
			{
				test: /\.scss$/,
				exclude: /theme.scss/,
				loader: ExtractTextPlugin.extract(
					'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass', {
						publicPath: './',
					}
				),
			},
			{
				test: /\.woff(2)?(\?[a-z0-9=&.]+)?$/,
				loader: 'url',
				query: {
					limit: 50000,
					mimetype: 'application/font-woff',
					name: './fonts/[name].[ext]',
				},
			}
		],
	},
	sassLoader: {
		includePaths: [
			path.resolve(
				__dirname,
				'node_modules'
			),
		],
		data: SASS_DATA,
	},
	postcss() {
		return [autoprefixer({ browsers: ['last 2 versions'] })];
	},
	plugins: [
		new ExtractTextPlugin('[hash].style.css', {
			allChunks: true,
		}),
		new HtmlWebpackPlugin({
			filename: './index.html',
			template: './src/app/index.html',
			title: 'Talend Web App Name',
		}),
		new CopyWebpackPlugin([
			{ from: 'src/assets' },
		]),
	],
};
