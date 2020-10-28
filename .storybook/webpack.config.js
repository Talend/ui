const SASS_DATA = "@import '~@talend/bootstrap-theme/src/theme/guidelines';";
const autoprefixer = require.main.require('autoprefixer');
const path = require('path');
const webpack = require.main.require('webpack');
const autoPrefixerPlugin = autoprefixer({ browsers: ['last 2 versions'] });
const CopyPlugin = require('copy-webpack-plugin');
const icons = require.resolve('@talend/icons/dist/info');
const iconsDist = path.dirname(icons);

module.exports = ({ config }) => {
	// Override css part to apply custom postcss config
	const cssRuleIndex = config.module.rules.findIndex(
		({ test }) => test.toString() === /\.css$/.toString(),
	);
	config.module.rules[cssRuleIndex] = {
		test: /\.css$/,
		use: [
			'style-loader',
			'css-loader',
			{
				loader: 'postcss-loader',
				options: {
					plugins: [autoPrefixerPlugin],
				},
			},
		],
	};

	config.module.rules.push(
		{
			test: /theme.scss$/,
			use: [
				'style-loader',
				'css-loader',
				{
					loader: 'postcss-loader',
					options: {
						plugins: [autoPrefixerPlugin],
					},
				},
				{
					loader: 'sass-loader',
					options: {
						prependData: SASS_DATA,
					},
				},
			],
		},
		{
			test: /\.scss$/,
			exclude: /theme.scss/,
			use: [
				'style-loader',
				'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
				{
					loader: 'postcss-loader',
					options: {
						plugins: [autoPrefixerPlugin],
					},
				},
				{
					loader: 'sass-loader',
					options: {
						prependData: SASS_DATA,
					},
				},
			],
		},
	);
	config.plugins = config.plugins.concat(
		new CopyPlugin({ patterns: [{ from: path.join(iconsDist, 'svg-bundle') }] }),
		new webpack.DefinePlugin({
			'process.env.ICON_BUNDLE': JSON.stringify(process.env.ICON_BUNDLE),
		}),
	);

	const progressPluginIndex = config.plugins.findIndex(
		plugin => plugin.constructor.name === 'ProgressPlugin',
	);
	config.plugins.splice(progressPluginIndex, 1);

	config.stats = 'errors-only';

	return config;
};
