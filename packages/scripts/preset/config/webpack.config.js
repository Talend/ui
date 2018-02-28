const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const babelrc = require('./.babelrc.json');
const extractCSS = new ExtractTextPlugin({ filename: '[name]-[hash].css' });

function getSassData(getUserConfig) {
	const sassData = '@import \'~@talend/bootstrap-theme/src/theme/guidelines\';';
	const userSassData = getUserConfig(['sass', 'data']);
	if (userSassData) {
		const adaptedUserSassData = Object.keys(userSassData)
			.map(key => (`${key}: ${userSassData[key]};`))
			.join('\n');
		return `${adaptedUserSassData}\n${sassData}`;
	}
	return sassData;
}

function getCommonStyleLoaders(enableModules) {
	let cssOptions = {};
	if (enableModules) {
		cssOptions = {
			sourceMap: true,
			modules: true,
			importLoaders: 1,
			localIdentName: '[name]__[local]___[hash:base64:5]',
		};
	}
	return [
		{ loader: 'css-loader', options: cssOptions },
		{
			loader: 'postcss-loader',
			options: { sourceMap: true, plugins: () => [autoprefixer({ browsers: ['last 2 versions'] })] },
		},
		{ loader: 'resolve-url-loader' },
	];
}

function getSassLoaders(enableModules, sassData) {
	return getCommonStyleLoaders(enableModules).concat({
		loader: 'sass-loader',
		options: { sourceMap: true, data: sassData },
	});
}

module.exports = ({ getUserConfig }) => {
	const sassData = getSassData(getUserConfig);

	return {
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
					use: extractCSS.extract(getSassLoaders(false, sassData)),
					include: /bootstrap-theme/,
				},
				{
					test: /\.scss$/,
					use: extractCSS.extract(getSassLoaders(true, sassData)),
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
				title: getUserConfig(['html', 'title']),
			}),
			new CopyWebpackPlugin([
				{ from: 'src/assets' },
			]),
		],
	};
};
