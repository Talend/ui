const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './src/app/index.js',
	output: {
		path: `${__dirname}/build`,
		filename: '[hash].app.js',
	},
	devtool: 'inline-source-map',
	resolve: ['', '.scss', '.css', 'js', 'jsx'],
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
		}, {
			test: /\.css$/,
			loader: ExtractTextPlugin.extract('style', 'css', {
				publicPath: './',
			}),
		}, {
			test: /\.scss$/,
			loader: ExtractTextPlugin.extract(
				'style',
				'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass', {
					publicPath: './',
				}
			),
		}],
	},
	sassLoader: {
		includePaths: [
			path.resolve(__dirname, './src/app'),
		],
	},
	plugins: [
		new ExtractTextPlugin('[hash].style.css', {
			allChunks: true,
		}),
		new HtmlWebpackPlugin({
			filename: './index.html',
			template: './src/app/index.html',
			title: 'Data streams',
		}),
		new CopyWebpackPlugin([
			{ from: 'src/assets' },
		]),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('developpement'),
		})
	],
};
