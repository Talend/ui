const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function getCommonStyleLoaders(enableModules, mode) {
	let cssOptions = {
		sourceMap: true,
	};
	if (enableModules) {
		cssOptions = {
			sourceMap: true,
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
				sourceMap: true,
			},
		},
		{ loader: 'resolve-url-loader', options: { sourceMap: true } },
	];
}

function getSassLoaders(enableModules, sassData, mode) {
	return getCommonStyleLoaders(enableModules, mode).concat({
		loader: 'sass-loader',
		options: { sourceMap: true, additionalData: sassData },
	});
}

module.exports = {
	getCommonStyleLoaders,
	getSassLoaders,
};
