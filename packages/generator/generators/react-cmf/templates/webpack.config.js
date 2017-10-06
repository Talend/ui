const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const extractCSS = new ExtractTextPlugin({ filename: '[name]-[hash].css' });

const SASS_DATA = `$brand-primary: #77828A;
@import '~@talend/bootstrap-theme/src/theme/guidelines';
`;

function getCommonStyleLoaders(enableModules) {
	let cssOptions = {};
	if (enableModules) {
		cssOptions = { sourceMap: true, modules: true, importLoaders: 1, localIdentName: '[name]__[local]___[hash:base64:5]' };
	}
	return [
		{ loader: 'css-loader', options: cssOptions },
		{ loader: 'postcss-loader', options: { sourceMap: true, plugins: () => [autoprefixer({ browsers: ['last 2 versions'] })] } },
		{ loader: 'resolve-url-loader' },
	];
}

function getSassLoaders(enableModules) {
	return getCommonStyleLoaders(enableModules).concat({ loader: 'sass-loader', options: { sourceMap: true, data: SASS_DATA } });
}

module.exports = {
	entry: ['babel-polyfill', 'whatwg-fetch', './src/app/index.js'],
	output: {
		path: `${__dirname}/build`,
		publicPath: '/',
		filename: '[name]-[hash].js',
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: { loader: 'babel-loader' },
			},
			{
				test: /\.css$/,
				use: extractCSS.extract(getCommonStyleLoaders()),
				exclude: /@talend/,
			},
			{
				test: /\.scss$/,
				use: extractCSS.extract(getSassLoaders()),
				include: /theme.scss/,
			},
			{
				test: /\.scss$/,
				use: extractCSS.extract(getSassLoaders(true)),
				exclude: /theme.scss/,
			},
			{
				test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader',
				options: { name: './fonts/[name].[ext]', limit: 50000, mimetype: 'application/font-woff' },
			},
		],
	},
	plugins: [
		extractCSS,
		new HtmlWebpackPlugin({
			filename: './index.html',
			template: './src/app/index.html',
			title: 'Talend Web App Name',
		}),
		new CopyWebpackPlugin([
			{ from: 'src/assets' },
		]),
	],
};
