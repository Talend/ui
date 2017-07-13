const SASS_DATA = '@import \'~bootstrap-talend-theme/src/theme/guidelines\';';
const autoprefixer = require.main.require('autoprefixer');
const webpack = require.main.require('webpack');

module.exports = (storybookBaseConfig) => {
	// remove Uglification plugin to improve build time in CI
	const uglifyIndex = storybookBaseConfig.plugins.findIndex(
		element => element instanceof webpack.optimize.UglifyJsPlugin);
	storybookBaseConfig.plugins.splice(uglifyIndex, 1);

	storybookBaseConfig.module.loaders.push(
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
			test: /\.scss$/,
			loaders: ['style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss', 'sass'],
		}
	);

	storybookBaseConfig.postcss = [
		autoprefixer({
			browsers: ['last 2 versions'],
		}),
	];

	storybookBaseConfig.sassLoader = {
		data: SASS_DATA,
	};

	return storybookBaseConfig;
};
