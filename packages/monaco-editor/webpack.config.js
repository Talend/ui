const { getBabelConfig } = require('@talend/scripts-config-babel/babel-resolver');
// eslint-disable-next-line import/no-extraneous-dependencies
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: getBabelConfig(),
				},
				// needed to compile class proeprties syntax in json worker
				include: /(monaco-editor)/,
			},
			// {
			// 	test: /\.css$/,
			// 	use: ['style-loader', 'css-loader'],
			// 	include: /(monaco-editor)/,
			// },
			{
				test: /\.ttf$/,
				use: ['file-loader'],
			},
		],
	},
	// plugins: [new MonacoWebpackPlugin({ languages: [] })],
};
