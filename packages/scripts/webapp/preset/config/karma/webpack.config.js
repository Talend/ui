const path = require('path');
const webpack = require('webpack');
const { getBabelConfig } = require('../babel-resolver');

const ROOT = path.resolve(__dirname, '../src');
const INDEX_TEMPLATE_PATH = path.resolve(__dirname, '../src/app/index.html');

module.exports = {
	mode: 'none',
	context: ROOT,
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'ng-annotate-loader',
						options: {
							ngAnnotate: 'ng-annotate-patched',
							es6: true,
							explicitOnly: false,
						},
					},
					{ loader: 'babel-loader', options: getBabelConfig() },
				],
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|css|scss|woff|woff2)$/,
				loader: 'null-loader',
			},
			{
				test: /\.html$/,
				use: [
					{ loader: 'ngtemplate-loader' },
					{
						loader: 'html-loader',
						options: {
							minimize: true,
							removeComments: true,
							collapseWhitespace: true,
						},
					},
				],
				exclude: INDEX_TEMPLATE_PATH,
			},
		],
	},
	// Some libraries import Node modules but don't use them in the browser.
	// Tell Webpack to provide empty mocks for them so importing them works.
	node: {
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty',
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			jquery: 'jquery',
			'window.jQuery': 'jquery',
			moment: 'moment',
		}),
	],
};
