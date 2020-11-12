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
				use: [
					MiniCssExtractPlugin.loader,
					{
						// The replacer is used to create relative local paths instead of paths relative
						// to publicPath, because it makes it processable by webpack.
						loader: 'string-replace-loader',
						options: {
							search: /url\(\\"\//g, // The CSS output by css-loader is stringified, so the quotes are escaped
							replace: 'url(\\"./'
						},
					},
					'css-loader',
					'webfonts-loader'
				],
			},
			{
				test: /\.(woff|eot|ttf|svg)$/,
				loader: 'url-loader',
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: 'talend-icons-webfont.css' }),
	],
	node: {
		fs: 'empty',
	},
};
