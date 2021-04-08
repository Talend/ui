const CDNPlugin = require('@talend/dynamic-cdn-webpack-plugin');
const moduleToCdn = require('@talend/module-to-cdn');
const SASS_DATA = "@import '~@talend/bootstrap-theme/src/theme/guidelines';";
const autoprefixer = require.main.require('autoprefixer');
const path = require('path');
const webpack = require.main.require('webpack');
const autoPrefixerPlugin = autoprefixer({ browsers: ['last 2 versions'] });
const CopyPlugin = require('copy-webpack-plugin');
const icons = require.resolve('@talend/icons/dist/info');
const iconsDist = path.dirname(icons);
const iconsSrc = path.join(iconsDist, '../src');

// cdn.moduleToCdn.add(cdn.umds); // activate custom build
function addURL(info) {
	info.url = `https://statics-dev.cloud.talend.com/${info.name}/${info.version}${info.path}`;
	info.styleUrl = info.stylePath && `https://statics-dev.cloud.talend.com/${info.name}/${info.version}${info.stylePath}`;
	return info;
}

function resolver(importPath, version, options) {
	const info = moduleToCdn(importPath, version, options);
	if (!info) {
		return info;
	}
	addURL(info)
	return info;
}
const cdnPlugin = new CDNPlugin({
	resolver,
	addURL,
	// exclude those bad builds
	exclude: ['i18next', 'react-i18next', 'react-popper', 'react-css-transition', 'timezone-support', 'hoist-non-react-statics'],
});

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
		new CopyPlugin({
			patterns: [{ from: path.join(iconsDist, 'svg-bundle') }, { from: iconsSrc, to: 'svg' }],
		}),
		new webpack.DefinePlugin({
			'process.env.ICON_BUNDLE': JSON.stringify(process.env.ICON_BUNDLE),
		}),
		cdnPlugin,
	);

	const progressPluginIndex = config.plugins.findIndex(
		plugin => plugin.constructor.name === 'ProgressPlugin',
	);
	config.plugins.splice(progressPluginIndex, 1);

	config.stats = 'errors-only';

	return config;
};
