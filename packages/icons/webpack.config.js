const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractFonts = new ExtractTextPlugin({
	filename: 'talend-icons-webfont.css',
	allChunks: true,
});

module.exports = {
	context: path.resolve(__dirname),
	entry: './index.js',
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.font\.(js|json)$/,
				loader: extractFonts.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
						},
						{
							loader: 'fontgen-loader',
						}
					],
				}),
			}, {
				test: /\.(woff|eot|ttf|svg)$/,
				loader: 'url-loader'
			}
		]
	},
	plugins: [
		extractFonts,
	],
	node: {
		fs: 'empty'
	}
};
