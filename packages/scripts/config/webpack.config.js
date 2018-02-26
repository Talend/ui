const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const babelrc = require('../config/.babelrc.json');
const extractCSS = new ExtractTextPlugin({ filename: '[name]-[hash].css' });

// TODO get SASS DATA colors from config passed to Talend-scripts
const SASS_DATA = `
$brand-primary: #4F93A7;
$brand-primary-t7: #00A1B3;
$brand-secondary-t7: #168AA6;
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
	entry: ['babel-polyfill', 'whatwg-fetch', `${process.cwd()}/src/app/index.js`],
	output: {
		path: `${process.cwd()}/dist`,
		publicPath: '/',
		filename: '[name]-[hash].js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: babelrc,
				},
			},
			{
				test: /\.css$/,
				use: extractCSS.extract(getCommonStyleLoaders()),
				exclude: /@talend/,
			},
			{
				test: /\.scss$/,
				use: extractCSS.extract(getSassLoaders()),
				include: /bootstrap-theme/,
			},
			{
				test: /\.scss$/,
				use: extractCSS.extract(getSassLoaders(true)),
				exclude: /bootstrap-theme/,
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
			template: `${process.cwd()}/src/app/index.html`,
			title: 'Talend Data Preparation',
		}),
		new CopyWebpackPlugin([
			{ from: 'src/assets' },
		]),
	],
};
