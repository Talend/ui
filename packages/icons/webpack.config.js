const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'production',
	context: path.resolve(__dirname),
	entry: './index.js',
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.font\.(js)$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'webfonts-loader'],
			},
			{
				test: /\.(woff|eot|ttf|svg)$/,
				loader: 'url-loader',
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'talend-icons-webfont.css',
			allChunks: true,
		}),
	],
	node: {
		fs: 'empty',
	},
};
