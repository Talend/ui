/* eslint-disable no-console */
const path = require('path');
const childProcess = require('child_process');

const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const ReactCMFWebpackPlugin = require('@talend/react-cmf-webpack-plugin');
const TalendHTML = require('@talend/html-webpack-plugin');
const AppLoader = require('@talend/react-components/lib/AppLoader/constant').default;
const DEFAULT_APP_LOADER_ICON =
	'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+DQoJPHBhdGggZD0iTTkuNjk0IDE0LjY1MmExLjA3NiAxLjA3NiAwIDAgMS0uNzE1LjQyMSAxLjA4NiAxLjA4NiAwIDEgMS0uMTQ4LTIuMTU4Yy4yMzUgMCAuNDYyLjA3NS42NTIuMjIuMjMuMTczLjM4LjQyNy40Mi43MTRhMS4wNyAxLjA3IDAgMCAxLS4yMDkuODAzTTIuMTUgMi42MjdBMS4wODQgMS4wODQgMCAxIDEgLjQxOCAxLjMyMiAxLjA4NCAxLjA4NCAwIDAgMSAyLjE1IDIuNjI3bTExLjM4MyAyLjQ5MWEyLjQ2IDIuNDYgMCAwIDAtMS40ODIuNDk0TDguOTQgMS43OThhLjU5LjU5IDAgMSAwLS4xNTYuMTI1bDMuMTExIDMuODE2YTIuNDg2IDIuNDg2IDAgMCAwLS41NTcuNzE4bC04Ljg0LTQuMDYyYy4wNjUtLjE5LjA4Ni0uMzk0LjA1Ny0uNTk5QTEuMjc0IDEuMjc0IDAgMCAwIDIuMDU4Ljk1YTEuMjc4IDEuMjc4IDAgMCAwLS45NTItLjI0NyAxLjI4NiAxLjI4NiAwIDAgMCAuMzU2IDIuNTQ0IDEuMjc5IDEuMjc5IDAgMCAwIC45NTYtLjY2OGw4LjgzOCA0LjA2Yy0uMTEuMjY0LS4xNzYuNTUtLjE4Ny44NUgzLjU2M2EuNzg4Ljc4OCAwIDAgMC0uMzEtLjUzMy43OTkuNzk5IDAgMCAwLTEuMTEzLjE1NS43ODYuNzg2IDAgMCAwIC4xNTYgMS4xMDUuNzk5Ljc5OSAwIDAgMCAxLjI2Ny0uNTI3aDcuNTA2Yy4wMTQuMzIzLjA4OC42My4yMTUuOTFsLTEuOTAzLjk0MWEuNTkyLjU5MiAwIDEgMCAuMDg5LjE3OWwxLjkwNC0uOTRjLjE2Mi4yOTIuMzgyLjU0OC42NDUuNzUzbC0yLjQ3MyAzLjQwNGExLjI4IDEuMjggMCAwIDAtMS43NDIuMjkxIDEuMjg4IDEuMjg4IDAgMCAwIC4yNTMgMS44IDEuMjggMS4yOCAwIDAgMCAuOTUyLjI0NmMuMzQtLjA0OC42NC0uMjI1Ljg0Ny0uNDk5LjIwNy0uMjc0LjI5NC0uNjEyLjI0Ni0uOTUyYTEuMjc2IDEuMjc2IDAgMCAwLS4zOTktLjc2M2wyLjQ3OS0zLjQxYTIuNDY4IDIuNDY4IDAgMSAwIDEuMzUyLTQuNTMiLz4NCjwvc3ZnPg0K)';

const { getBabelConfig } = require('./babel-resolver');
const LICENSE_BANNER = require('./licence');

function getSassData(userSassData) {
	let sassData = ["@import '~@talend/bootstrap-theme/src/theme/guidelines';"];

	if (userSassData && userSassData.data) {
		sassData = Object.keys(userSassData.data)
			.map(key => `${key}: ${userSassData.data[key]};`)
			.concat(sassData);
	}

	return sassData.join('\n');
}

function getCommonStyleLoaders(enableModules, mode) {
	let cssOptions = {};
	if (enableModules) {
		cssOptions = {
			sourceMap: mode === 'development',
			modules: true,
			importLoaders: 1,
			localIdentName: '[name]__[local]___[hash:base64:5]',
		};
	}
	return [
		{ loader: mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader },
		{ loader: 'css-loader', options: cssOptions },
		{
			loader: 'postcss-loader',
			options: {
				sourceMap: mode === 'development',
				plugins: () => [autoprefixer({ browsers: ['>0.25%', 'IE 11', 'not op_mini all'] })],
			},
		},
		{ loader: 'resolve-url-loader' },
	];
}

function getSassLoaders(enableModules, sassData, mode) {
	return getCommonStyleLoaders(enableModules, mode).concat({
		loader: 'sass-loader',
		options: { sourceMap: true, data: sassData },
	});
}

function getVersions() {
	const talendUi = [
		'@talend/bootstrap-theme',
		'@talend/icons',
		'@talend/react-cmf',
		'@talend/react-cmf-cqrs',
		'@talend/react-components',
		'@talend/react-containers',
		'@talend/react-forms',
		'@talend/react-sagas',
	];
	let sha1;
	try {
		// eslint-disable-next-line global-require
		sha1 = require(path.join(process.cwd(), 'sha1.json'));
	} catch (e) {
		sha1 = {};
	}
	// eslint-disable-next-line global-require
	const packageJson = require(path.join(process.cwd(), 'package.json'));

	let talendUiVersion;
	const talendLibraries = Object.entries(packageJson.dependencies)
		.filter(([name]) => name.startsWith('@talend'))
		.reduce((acc, [name, version]) => {
			if (talendUi.includes(name)) {
				talendUiVersion = version;
			} else {
				acc.push({
					name,
					version,
					sha1: sha1[name],
				});
			}
			return acc;
		}, []);

	if (talendUiVersion) {
		talendLibraries.push({
			name: '@talend/ui',
			version: talendUiVersion,
			sha1: sha1['@talend/ui'],
		});
	}

	let revision = process.env.GIT_COMMIT;
	if (!revision) {
		try {
			revision = childProcess
				.execSync('git rev-parse HEAD')
				.toString()
				.trim();
		} catch (e) {
			console.info('Failed to get git revision');
		}
	}

	return {
		version: packageJson.version,
		talendLibraries,
		revision,
	};
}

function getJSLoaders(angular) {
	const loaders = [
		{ loader: 'cache-loader' },
		{
			loader: 'babel-loader',
			options: getBabelConfig(),
		},
	];

	if (angular) {
		loaders.unshift({
			loader: 'ng-annotate-loader',
			options: {
				ngAnnotate: 'ng-annotate-patched',
				es6: true,
				explicitOnly: false,
			},
		});
	}

	return loaders;
}

function getHTMLLoaders(angular) {
	const loaders = [
		{ loader: 'cache-loader' },
		{
			loader: 'html-loader',
			options: {
				minimize: true,
				removeComments: true,
				collapseWhitespace: true,
			},
		},
	];

	if (angular) {
		loaders.unshift({ loader: 'ngtemplate-loader' });
	}

	return loaders;
}

function getCopyConfig(userCopyConfig = []) {
	const config = [...userCopyConfig];
	const assetsOverridden = config.some(nextAsset =>
		typeof nextAsset === 'object' ? nextAsset.from === 'src/assets' : nextAsset === 'src/assets',
	);
	if (!assetsOverridden) {
		config.push({ from: 'src/assets' });
	}
	return config;
}

module.exports = ({ getUserConfig, mode }) => {
	const angular = getUserConfig('angular');
	const cssModulesEnabled = getUserConfig(['css', 'modules'], true);
	const userHtmlConfig = getUserConfig('html');
	const appLoaderIcon = getUserConfig(['html', 'appLoaderIcon'], DEFAULT_APP_LOADER_ICON);
	const userSassData = getUserConfig('sass', {});
	const userCopyConfig = getUserConfig('copy');
	const cmf = getUserConfig('cmf');
	const { theme } = userSassData;

	const sassData = getSassData(userSassData);
	const indexTemplatePath = path.join(process.cwd(), 'src', 'app', 'index.html');

	return {
		entry: {
			polyfills: ['@babel/polyfill', 'whatwg-fetch'],
			theme: [
				'@talend/bootstrap-theme/src/theme/theme.scss',
				theme && `@talend/bootstrap-theme/src/theme/variations/_${theme}.scss`,
			].filter(Boolean),
			app: `${process.cwd()}/src/app/index.js`,
		},
		output: {
			filename: '[name]-[hash].js',
			publicPath: '/',
			globalObject: 'this',
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: getJSLoaders(angular),
				},
				{
					test: /\.html$/,
					use: getHTMLLoaders(angular),
					exclude: indexTemplatePath,
				},
				{
					test: /\.css$/,
					use: getCommonStyleLoaders(false, mode),
					exclude: /@talend/,
				},
				{
					test: /\.scss$/,
					use: getSassLoaders(false, sassData, mode),
					include: /bootstrap-theme/,
				},
				{
					test: /\.scss$/,
					use: getSassLoaders(true, sassData, mode),
					include: /@talend/,
					exclude: /bootstrap-theme/,
				},
				{
					test: /\.scss$/,
					use: getSassLoaders(cssModulesEnabled, sassData, mode),
					exclude: /@talend/,
				},
				{
					test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
					loader: 'url-loader',
					options: {
						name: './fonts/[name].[ext]',
						limit: 10000,
						mimetype: 'application/font-woff',
					},
				},
				{
					test: /\.svg$/,
					loader: 'url-loader',
					options: {
						name: 'assets/svg/[name].[ext]',
						limit: 10000,
						mimetype: 'image/svg+xml',
					},
				},
				{
					test: /\.(png|jpg|jpeg|gif)$/,
					loader: 'url-loader',
					options: {
						name: 'assets/img/[name].[ext]',
						limit: 10000,
						mimetype: 'image/png',
					},
				},
			],
		},
		plugins: [
			new CleanWebpackPlugin(['dist'], { verbose: true, root: process.cwd() }),
			new webpack.DefinePlugin({
				BUILD_TIMESTAMP: Date.now(),
				TALEND_APP_INFO: JSON.stringify(getVersions()),
				'process.env.DISABLE_JS_ERROR_NOTIFICATION': JSON.stringify(
					process.env.DISABLE_JS_ERROR_NOTIFICATION,
				),
			}),
			mode === 'development' && new webpack.HotModuleReplacementPlugin(),
			mode === 'production' && new MiniCssExtractPlugin({ filename: '[name]-[hash].css' }),
			new HtmlWebpackPlugin({
				filename: './index.html',
				template: indexTemplatePath,
				appLoader: AppLoader.APP_LOADER,
				...userHtmlConfig,
			}),
			new TalendHTML({ appLoaderIcon }),
			new CopyWebpackPlugin(getCopyConfig(userCopyConfig)),
			new webpack.BannerPlugin({ banner: LICENSE_BANNER }),
			cmf && new ReactCMFWebpackPlugin({ watch: mode === 'development' }),
		].filter(Boolean),
		optimization: {
			// Automatically split vendor and commons
			// https://twitter.com/wSokra/status/969633336732905474
			// https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
			splitChunks: { chunks: 'all' },
			// Keep the runtime chunk separated to enable long term caching
			// https://twitter.com/wSokra/status/969679223278505985
			runtimeChunk: true,
		},
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000,
		},
		devServer: {
			port: 3000,
			stats: 'errors-only',
			historyApiFallback: true,
			contentBase: path.join(process.cwd(), 'dist'),
			compress: true,
			hot: true,
		},
	};
};
