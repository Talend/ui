const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: {
		TalendDesignTokens: [
			'./src/index.ts',
			'./src/index.scss',
		],
	},
	output: {
		filename: '[name].js',
		libraryTarget: 'umd',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
	],
};
