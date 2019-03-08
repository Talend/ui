const SASS_DATA = "@import '~@talend/bootstrap-theme/src/theme/guidelines';";
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
	);

	return config;
};
