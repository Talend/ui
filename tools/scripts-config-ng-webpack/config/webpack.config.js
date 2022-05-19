const path = require('path');
const webpack = require('webpack');
const { getBabelConfig } = require('@talend/scripts-config-babel/babel-resolver');

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{ loader: 'babel-loader', options: getBabelConfig() }],
			},
			{
				test: /\.html$/,
				use: [
					{ loader: 'cache-loader' },
					{ loader: 'ngtemplate-loader' },
					{ loader: 'html-loader' },
				],
				exclude: path.join(process.cwd(), 'src', 'app', 'index.html'),
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
			moment: 'moment',
			jQuery: 'jquery',
			$: 'jquery',
		}),
	],
};
