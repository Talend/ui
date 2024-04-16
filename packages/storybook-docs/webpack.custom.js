const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
	entry: { globalStyles: './src/globalStyles.scss', managerStyles: './src/managerStyles.scss' },
	output: {
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].min.css',
			chunkFilename: '[name].min.css',
		}),
	],
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					{ loader: MiniCssExtractPlugin.loader, options: { esModule: false } },
					{
						loader: require.resolve('css-loader'),
						options: { sourceMap: true },
					},
					{
						loader: require.resolve('postcss-loader'),
						options: {
							postcssOptions: {
								plugins: ['autoprefixer'],
								sourceMap: true,
							},
						},
					},
					{
						loader: require.resolve('resolve-url-loader'),
						options: { sourceMap: true },
					},
					{
						loader: require.resolve('sass-loader'),
						options: {
							sourceMap: true,
							sassOptions: { includePaths: ['./node_modules', '../../node_modules'] },
						},
					},
				],
			},
		],
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
};
