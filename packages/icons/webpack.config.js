const path = require('path');

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, 'src'),
	output: {
		path: path.resolve(__dirname, 'lib'),
		filename: 'index.js',
		publicPath: 'auto',
		chunkFilename: '[contenthash].js',
		globalObject: 'this',
	},
	devtool: 'source-map',
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
								// #202020 is the value of our neutral/icon token used by Figma
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
};
