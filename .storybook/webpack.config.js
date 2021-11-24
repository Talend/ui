const SASS_DATA = "@use '~@talend/bootstrap-theme/src/theme/guidelines' as *;";
const CDNPlugin = require('@talend/dynamic-cdn-webpack-plugin');
const autoprefixer = require.main.require('autoprefixer');
const autoPrefixerPlugin = autoprefixer({ browsers: ['last 2 versions'] });

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

	config.module.rules.push({
		test: /\.scss$/,
		use: [
			'style-loader',
			{
				loader: 'css-loader',
				options: {
					sourceMap: true,
					modules: {
						localIdentName: '[name]__[local]___[hash:base64:5]',
					},
					importLoaders: 1,
				},
			},
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
					sourceMap: true,
				},
			},
		],
	});

	const progressPluginIndex = config.plugins.findIndex(
		plugin => plugin.constructor.name === 'ProgressPlugin',
	);
	config.plugins.splice(progressPluginIndex, 1);
	config.plugins.push(new CDNPlugin());
	config.stats = 'errors-only';

	return config;
};
