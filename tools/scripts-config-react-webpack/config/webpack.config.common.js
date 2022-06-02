const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { getBabelConfig } = require('@talend/scripts-config-babel/babel-resolver');

const babelConfig = getBabelConfig();
const sourceMap = true;

function getCommonStyleLoaders(enableModules, mode) {
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
	return [
		mode === 'development'
			? { loader: 'style-loader' }
			: { loader: MiniCssExtractPlugin.loader, options: { esModule: false } },
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
			options: babelConfig,
		},
	].filter(Boolean);
}

function getSassLoaders(enableModules, sassData, mode) {
	return getCommonStyleLoaders(enableModules, mode).concat(
		{ loader: 'resolve-url-loader', options: { sourceMap: true } },
		{
			loader: 'sass-loader',
			options: { sourceMap: true, additionalData: sassData },
		},
	);
}

module.exports = {
	getCommonStyleLoaders,
	getSassLoaders,
	getJSAndTSLoader,
};
