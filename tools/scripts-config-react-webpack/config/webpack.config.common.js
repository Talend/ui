const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { getBabelConfig } = require('@talend/scripts-config-babel/babel-resolver');
const utils = require('@talend/scripts-utils');

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
	const styleLoader = isEnvDevelopmentServe ? 'style-loader' : MiniCssExtractPlugin.loader;
	return [
		{ loader: styleLoader, options: { esModule: false } },
		{ loader: 'css-loader', options: cssOptions },
		{
			loader: 'postcss-loader',
			options: {
				postcssOptions: {
					plugins: ['autoprefixer'],
				},
				sourceMap,
			},
		},
	];
}

function getJSAndTSLoader(env, useTypescript) {
	return [
		!env.nocache && { loader: 'cache-loader' },
		{
			loader: 'babel-loader',
			options: getBabelLoaderOptions(babelConfig),
		},
	].filter(Boolean);
}

function getSassLoaders(enableModules, sassData, isEnvDevelopmentServe) {
	const sourceMap = true;
	return getCommonStyleLoaders(enableModules, isEnvDevelopmentServe).concat(
		{ loader: 'resolve-url-loader', options: { sourceMap } },
		{
			loader: 'sass-loader',
			options: { sourceMap, additionalData: sassData },
		},
	);
}

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

module.exports = {
	getSassData,
	getCommonStyleLoaders,
	getSassLoaders,
	getJSAndTSLoader,
	getAssetsRules,
};
