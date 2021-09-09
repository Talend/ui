const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env = {}) => ({
	mode: env.production ? 'production' : 'development',
	context: path.resolve(__dirname),
	entry: './src/umd.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		library: 'TalendIcons',
		libraryTarget: 'umd',
		filename: `TalendIcons${env.production ? '.min' : ''}.js`,
		globalObject: 'this',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.svg$/,
				use: ['@svgr/webpack'],
			},
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: `umd${env.production ? '.min' : ''}.dependencies.json`,
					to: `TalendIcons${env.production ? '.min' : ''}.js.dependencies.json`,
				},
			],
		}),
	],
	node: {
		fs: 'empty',
	},
	externals: {
		react: {
			commonjs: 'react',
			commonjs2: 'react',
			amd: 'react',
			root: 'React',
		},
	},
});
