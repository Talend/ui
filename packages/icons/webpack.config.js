const path = require('path');

// eslint-disable-next-line import/no-extraneous-dependencies
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, 'src'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: 'auto',
		filename: 'TalendIcons.js',
		chunkFilename: '[contenthash].js',
		library: 'TalendIcons',
		libraryTarget: 'umd',
		globalObject: 'this',
	},
	devtool: 'source-map',
	externals: {
		react: 'React',
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
	},
	module: {
		rules: [
			{
				test: /\.(js|ts|tsx)$/,
				use: [
					{
						loader: 'cache-loader',
					},
					{
						loader: 'babel-loader',
						options: {
							extends: '@talend/scripts-config-babel/.babelrc.json',
							plugins: ['syntax-dynamic-import'],
						},
					},
				],
			},
			{
				test: /\.svg$/,
				include: path.resolve(__dirname, 'src'),
				use: [
					{
						loader: '@svgr/webpack',
						options: {
							ignoreExisting: true,
							memo: true,
							ref: true,
							replaceAttrValues: {
								'#202020': 'currentColor',
							},
							svgProps: {
								'aria-hidden': true,
							},
						},
					},
				],
			},
		],
	},
	optimization: {
		chunkIds: 'named',
		moduleIds: 'named',
		splitChunks: {
			chunks: 'all',
		},
	},
	stats: {
		children: false,
	},
	plugins: [
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			openAnalyzer: false,
			logLevel: 'error',
		}),
	],
};
