/* eslint-disable no-console */
const fs = require('fs');

const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const TalendHTML = require('@talend/html-webpack-plugin');
const AppLoader = require('@talend/react-components/lib/AppLoader/constant').default;
const DEFAULT_APP_LOADER_ICON =
	'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+DQoJPHBhdGggZD0iTTkuNjk0IDE0LjY1MmExLjA3NiAxLjA3NiAwIDAgMS0uNzE1LjQyMSAxLjA4NiAxLjA4NiAwIDEgMS0uMTQ4LTIuMTU4Yy4yMzUgMCAuNDYyLjA3NS42NTIuMjIuMjMuMTczLjM4LjQyNy40Mi43MTRhMS4wNyAxLjA3IDAgMCAxLS4yMDkuODAzTTIuMTUgMi42MjdBMS4wODQgMS4wODQgMCAxIDEgLjQxOCAxLjMyMiAxLjA4NCAxLjA4NCAwIDAgMSAyLjE1IDIuNjI3bTExLjM4MyAyLjQ5MWEyLjQ2IDIuNDYgMCAwIDAtMS40ODIuNDk0TDguOTQgMS43OThhLjU5LjU5IDAgMSAwLS4xNTYuMTI1bDMuMTExIDMuODE2YTIuNDg2IDIuNDg2IDAgMCAwLS41NTcuNzE4bC04Ljg0LTQuMDYyYy4wNjUtLjE5LjA4Ni0uMzk0LjA1Ny0uNTk5QTEuMjc0IDEuMjc0IDAgMCAwIDIuMDU4Ljk1YTEuMjc4IDEuMjc4IDAgMCAwLS45NTItLjI0NyAxLjI4NiAxLjI4NiAwIDAgMCAuMzU2IDIuNTQ0IDEuMjc5IDEuMjc5IDAgMCAwIC45NTYtLjY2OGw4LjgzOCA0LjA2Yy0uMTEuMjY0LS4xNzYuNTUtLjE4Ny44NUgzLjU2M2EuNzg4Ljc4OCAwIDAgMC0uMzEtLjUzMy43OTkuNzk5IDAgMCAwLTEuMTEzLjE1NS43ODYuNzg2IDAgMCAwIC4xNTYgMS4xMDUuNzk5Ljc5OSAwIDAgMCAxLjI2Ny0uNTI3aDcuNTA2Yy4wMTQuMzIzLjA4OC42My4yMTUuOTFsLTEuOTAzLjk0MWEuNTkyLjU5MiAwIDEgMCAuMDg5LjE3OWwxLjkwNC0uOTRjLjE2Mi4yOTIuMzgyLjU0OC42NDUuNzUzbC0yLjQ3MyAzLjQwNGExLjI4IDEuMjggMCAwIDAtMS43NDIuMjkxIDEuMjg4IDEuMjg4IDAgMCAwIC4yNTMgMS44IDEuMjggMS4yOCAwIDAgMCAuOTUyLjI0NmMuMzQtLjA0OC42NC0uMjI1Ljg0Ny0uNDk5LjIwNy0uMjc0LjI5NC0uNjEyLjI0Ni0uOTUyYTEuMjc2IDEuMjc2IDAgMCAwLS4zOTktLjc2M2wyLjQ3OS0zLjQxYTIuNDY4IDIuNDY4IDAgMSAwIDEuMzUyLTQuNTMiLz4NCjwvc3ZnPg0K)';

const LICENSE_BANNER = require('./licence');

const userBabelrc = `${process.cwd()}/.babelrc`;
const babelrcPath = 'node_modules/@talend/scripts/preset/config/babelrc.json';
let babelrc;

// require support json only if filename ends with json
if (fs.existsSync(userBabelrc)) {
	babelrc = JSON.parse(fs.readFileSync(userBabelrc, 'utf8'));
	if (babelrc.extends !== babelrcPath) {
		throw new Error(`you have your own babelrc. Please extends our babelrc:
		 { "extends": "${babelrcPath}"`);
	}
} else {
	// eslint-disable-next-line global-require
	babelrc = require('./.babelrc.json');
}

function getSassData(getUserConfig) {
	let sassData = ["@import '~@talend/bootstrap-theme/src/theme/guidelines';"];

	const userSassData = getUserConfig('sass');
	if (userSassData && userSassData.data) {
		sassData = Object.keys(userSassData.data)
			.map(key => `${key}: ${userSassData.data[key]};`)
			.concat(sassData);
	}
	if (userSassData && userSassData.theme) {
		sassData.push(`@import '~@talend/bootstrap-theme/src/theme/variations/${userSassData.theme}';`);
	}

	return sassData.join('\n');
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
		{ loader: MiniCssExtractPlugin.loader },
		{ loader: 'css-loader', options: cssOptions },
		{
			loader: 'postcss-loader',
			options: {
				sourceMap: true,
				plugins: () => [autoprefixer({ browsers: ['>0.25%', 'IE 11', 'not op_mini all'] })],
			},
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
		entry: ['@babel/polyfill', 'whatwg-fetch', `${process.cwd()}/src/app/index.js`],
		output: {
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
					use: getCommonStyleLoaders(),
					exclude: /@talend/,
				},
				{
					test: /\.scss$/,
					use: getSassLoaders(false, sassData),
					include: /bootstrap-theme/,
				},
				{
					test: /\.scss$/,
					use: getSassLoaders(true, sassData),
					exclude: /bootstrap-theme/,
				},
				{
					test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
					loader: 'url-loader',
					options: {
						name: './fonts/[name].[ext]',
						limit: 50000,
						mimetype: 'application/font-woff',
					},
				},
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name]-[hash].css',
			}),
			new HtmlWebpackPlugin({
				filename: './index.html',
				template: `${process.cwd()}/src/app/index.html`,
				appLoader: AppLoader.APP_LOADER,
				...getUserConfig('html'),
			}),
			new TalendHTML({
				loadCSSAsync: true,
				appLoaderIcon: getUserConfig(['html', 'appLoaderIcon'], DEFAULT_APP_LOADER_ICON),
			}),
			new CopyWebpackPlugin([{ from: 'src/assets' }]),
			new webpack.BannerPlugin({
				banner: LICENSE_BANNER,
			}),
		],
	};
};
