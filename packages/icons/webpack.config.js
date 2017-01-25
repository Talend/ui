const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractFonts = new ExtractTextPlugin('talend-icons-webfont.css', {
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
		loaders: [
			{
				test: /\.font\.(js|json)$/,
				loader: extractFonts.extract('style', 'css!fontgen'),
			}, {
				test: /\.(woff|eot|ttf|svg)$/,
				loader: 'url'
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
