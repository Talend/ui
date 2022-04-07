const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const { getBabelConfig } = require('@talend/scripts-config-babel/babel-resolver');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const useTypescript = fs.existsSync(resolveApp('tsconfig.json'));

const ROOT = path.resolve(process.cwd(), 'src');
const INDEX_TEMPLATE_PATH = path.resolve(process.cwd(), 'src', 'app', 'index.html');

module.exports = {
	mode: 'none',
	context: ROOT,
	resolve: {
		extensions: ['.js', '.json', useTypescript && '.ts', useTypescript && '.tsx'].filter(Boolean),
	},
	module: {
		rules: [
			{
				test: useTypescript ? /\.(js|ts|tsx)$/ : /\.js$/,
				use: [
					{ loader: 'cache-loader' },
					{ loader: 'babel-loader', options: getBabelConfig() },
				].filter(Boolean),
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
