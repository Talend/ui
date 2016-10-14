const autoprefixer = require('autoprefixer');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractFonts = new ExtractTextPlugin('fonts.css', {
	allChunks: true,
});
const extractFontsMin = new ExtractTextPlugin('fonts.min.css', {
	allChunks: true,
});
const extractBootstrap = new ExtractTextPlugin('bootstrap.css', {
	allChunks: true,
});
const extractBootstrapMin = new ExtractTextPlugin('bootstrap.min.css', {
	allChunks: true,
});

const autoprefixerConfig = autoprefixer({ browsers: ['not ie <= 9'] });

const BASE_CONF = {
	entry: './src/index.js',
	output: {
		path: `${__dirname}/dist`,
		filename: 'bootstrap.js',
	},
	resolve: ['', '.scss', '.css', '.js'],
	module: {
		loaders: [
			{
				test: /\.woff(2)?(\?[a-z0-9=&.]+)?$/,
				loader: 'url',
				query: {
					limit: 50000,
					mimetype: 'application/font-woff',
					name: './fonts/[name].[ext]'
				}
			},
			{
				test: /\.(ttf|otf|eot|svg)(\?[a-z0-9=&.]+)?$/,
				loader: 'file',
				query: {
					name: './fonts/[name].[ext]'
				}
			},
			{
				test: /\.css$/,
				loader: extractFonts.extract('style', 'css'),
			},
			{
				test: /bootstrap\.scss$/,
				loader: extractBootstrap.extract('style', 'css!postcss!sass'),
			}
		],
	},
	postcss: function () {
		return [
			autoprefixerConfig
		];
	},
	plugins: [
		extractFonts,
		extractBootstrap
	],
	devServer: {
		contentBase: './example',
	},
};

const MINIFIED = Object.assign({}, BASE_CONF, {
	module: {
		loaders: [
			{
				test: /\.woff(2)?(\?[a-z0-9=&.]+)?$/,
				loader: 'url',
				query: {
					limit: 50000,
					mimetype: 'application/font-woff',
					name: './fonts/[hash].[ext]'
				}
			},
			{
				test: /\.(ttf|otf|eot|svg)(\?[a-z0-9=&.]+)?$/,
				loader: 'file',
				query: {
					name: './fonts/[hash].[ext]'
				}
			},
			{
				test: /source-sans-pro\.css$/,
				loader: extractFontsMin.extract('style', 'css?minimize'),
			},
			{
				test: /bootstrap\.scss$/,
				loader: extractBootstrapMin.extract('style', 'css?minimize!sass'),
			}
		],
	},
	plugins: [
		extractFontsMin,
		extractBootstrapMin,
	],
});

module.exports = [BASE_CONF, MINIFIED];
