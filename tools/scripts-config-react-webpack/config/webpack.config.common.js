const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { getBabelConfig } = require('@talend/scripts-config-babel/babel-resolver');
const utils = require('@talend/scripts-utils');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const { getBabelLoaderOptions } = utils.babel;

const babelConfig = getBabelConfig();

function getSassData(userSassData) {
	let sassData = '';

	if (userSassData && userSassData.data) {
		console.warn(
			'DEPRECATION Usage of sass.data in talend-script.json file is deprecated. Variables are considered as constants since Talend/UI 6.0',
		);
		const sassDataWith = Object.keys(userSassData.data)
			.map(key => `${key}: ${userSassData.data[key]};`)
			.join('\n');
		sassData += sassDataWith;
	}

	// eslint-disable-next-line no-console
	console.log('sassData', sassData);
	return sassData;
}

function getCommonStyleLoaders(enableModules, isEnvDevelopmentServe) {
	const sourceMap = true;
	let cssOptions = {
		sourceMap,
	};
	if (enableModules) {
		cssOptions = {
			sourceMap,
			modules: {
				localIdentName: '[name]__[local]___[hash:base64:5]',
			},
			importLoaders: 1,
		};
	}
	const styleLoader = isEnvDevelopmentServe
		? require.resolve('style-loader')
		: MiniCssExtractPlugin.loader;
	return [
		{ loader: styleLoader, options: { esModule: false } },
		{ loader: require.resolve('css-loader'), options: cssOptions },
		{
			loader: require.resolve('postcss-loader'),
			options: {
				postcssOptions: {
					plugins: ['autoprefixer'],
				},
				sourceMap,
			},
		},
	];
}

function getJSAndTSLoader() {
	return [
		{
			loader: require.resolve('babel-loader'),
			options: getBabelLoaderOptions(babelConfig),
		},
	].filter(Boolean);
}

function getSassLoaders(enableModules, sassData, isEnvDevelopmentServe) {
	const sourceMap = true;
	return getCommonStyleLoaders(enableModules, isEnvDevelopmentServe).concat(
		{ loader: require.resolve('resolve-url-loader'), options: { sourceMap } },
		{
			loader: require.resolve('sass-loader'),
			options: {
				sourceMap,
				additionalData: sassData,
				sassOptions: {
					quietDeps: true,
				},
			},
		},
	);
}
const getFileNameForExtension = (extension, prefix) =>
	`${prefix || ''}[name]-[contenthash].${extension}`;

function getAssetsRules(hashed = true) {
	const name = `[name]${hashed ? '-[hash]' : ''}[ext]`;
	return [
		{
			test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
			type: 'asset/resource',
			generator: {
				filename: `assets/fonts/${name}`,
			},
		},
		{
			test: /\.svg$/,
			type: 'asset/resource',
			generator: {
				filename: `assets/svg/${name}`,
			},
		},
		{
			test: /\.(png|jpg|jpeg|gif)$/,
			type: 'asset/resource',
			generator: {
				filename: `assets/img/${name}`,
			},
		},
	];
}

function getWebpackRules(srcDirectories, useTypescript, devMode) {
	return [
		devMode && {
			test: /\.js$/,
			include: /node_modules/,
			use: [require.resolve('source-map-loader')],
			enforce: 'pre',
		},
		{
			test: /\.(js|jsx|ts|tsx)$/,
			exclude: /node_modules/,
			include: srcDirectories,
			use: getJSAndTSLoader(),
		},
		{
			test: /\.css$/,
			exclude: /\.module\.css$/,
			// include: srcDirectories,
			use: getCommonStyleLoaders(false, devMode),
		},
		{
			test: /\.module\.css$/,
			// include: srcDirectories,
			use: getCommonStyleLoaders(true, devMode),
		},
		{
			test: /\.scss$/,
			exclude: /\.module\.scss$/,
			// include: srcDirectories,
			use: getSassLoaders(false, '', devMode),
		},
		{
			test: /\.module\.scss$/,
			// include: srcDirectories,
			use: getSassLoaders(true, '', devMode),
		},
		...getAssetsRules(true),
	].filter(Boolean);
}

function getWebpackPlugins(useTypescript) {
	return [
		new MiniCssExtractPlugin({
			filename: getFileNameForExtension('css'),
			chunkFilename: getFileNameForExtension('css'),
		}),
		useTypescript && new ForkTsCheckerWebpackPlugin(),
	].filter(Boolean);
}

module.exports = {
	getSassData,
	getCommonStyleLoaders,
	getSassLoaders,
	getJSAndTSLoader,
	getAssetsRules,
	getFileNameForExtension,
	getWebpackRules,
	getWebpackPlugins,
};
