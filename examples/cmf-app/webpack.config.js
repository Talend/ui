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
	entry: ['babel-polyfill', 'whatwg-fetch', './src/app/index.js'],
	output: {
		path: `${__dirname}/build`,
		publicPath: '/',
		filename: '[hash].app.js',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.scss', '.css'],
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader',
					publicPath: './',
				}),
			},
			{
				test: /theme.scss$/,
				use: ExtractTextPlugin.extract({
					use: [{
						loader: 'css-loader',
					}, {
						loader: 'postcss-loader',
						options: {
							plugins: [
								autoprefixer({ browsers: ['last 2 versions'] }),
							],
						},
					}, {
						loader: 'sass-loader',
						options: {
							includePaths: [
								path.resolve(__dirname, 'node_modules'),
							],
							data: SASS_DATA,
						},
					}],
					publicPath: './',
				}),
			},
			{
				test: /\.scss$/,
				exclude: /theme.scss/,
				use: ExtractTextPlugin.extract({
					use: [{
						loader: 'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
					}, {
						loader: 'sass-loader',
						options: {
							includePaths: [
								path.resolve(__dirname, 'node_modules'),
							],
							data: SASS_DATA,
						},
					}],
					publicPath: './',
				}),
			},
			{
				test: /\.woff(2)?(\?[a-z0-9=&.]+)?$/,
				loader: 'url-loader',
				options: {
					limit: 50000,
					mimetype: 'application/font-woff',
					name: './fonts/[name].[ext]',
				},
			},
		],
	},
	plugins: [
		new ExtractTextPlugin({
			filename: '[hash].style.css',
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
