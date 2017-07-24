const SASS_DATA = '@import \'~bootstrap-talend-theme/src/theme/guidelines\';';
const autoprefixer = require.main.require('autoprefixer');
const path = require('path');
const webpack = require.main.require('webpack');

module.exports = (storybookBaseConfig) => {
	// remove Uglification plugin to improve build time in CI
	const uglifyIndex = storybookBaseConfig.plugins.findIndex(
		element => element instanceof webpack.optimize.UglifyJsPlugin);
	storybookBaseConfig.plugins.splice(uglifyIndex, 1);
	storybookBaseConfig.module.rules.push(
		{
			test: /\.woff(2)?(\?[a-z0-9=&.]+)?$/,
			loader: 'url-loader',
			options: {
				limit: 50000,
				mimetype: 'application/font-woff',
				name: './fonts/[name].[ext]',
			},
		},
		{
			test: /theme.scss$/,
			use: [
				'style-loader',
				'css-loader',
				{
					loader: 'postcss-loader',
					options: {
						autoprefixer: {
							browsers: ['last 2 versions'],
						},
					},
				},
				{
					loader: 'sass-loader',
					options: {
						data: SASS_DATA,
					},
				}
			],
		},
		{
			test: /\.scss$/,
			exclude: /theme.scss/,
			use: ['style-loader',
				'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
				{
					loader: 'postcss-loader',
					options: {
						autoprefixer: {
							browsers: ['last 2 versions'],
						},
					},
				},
				{
					loader: 'sass-loader',
					options: {
						data: SASS_DATA,
					},
				}
			],
		}
	);

	return storybookBaseConfig;
};
