const SASS_DATA = "@import '~@talend/bootstrap-theme/src/theme/guidelines';";
const autoprefixer = require.main.require('autoprefixer');
const autoPrefixerPlugin = autoprefixer({ browsers: ['last 2 versions'] });

module.exports = storybookBaseConfig => {
	storybookBaseConfig.entry['talend-theme'] = '@talend/bootstrap-theme/src/theme/theme.scss';
	const cssRuleIndex = storybookBaseConfig.module.rules.findIndex(
		({ test }) => test.toString() === /\.css$/.toString(),
	);
	storybookBaseConfig.module.rules[cssRuleIndex] = {
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

	storybookBaseConfig.module.rules.push(
		{
			test: /\.woff(2)?(\?[a-z0-9=&.]+)?$/,
			loader: 'url-loader',
			enforce: 'pre',
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
						plugins: [autoPrefixerPlugin],
					},
				},
				{
					loader: 'sass-loader',
					options: {
						data: SASS_DATA,
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
						data: SASS_DATA,
					},
				},
			],
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
	);

	return storybookBaseConfig;
};
