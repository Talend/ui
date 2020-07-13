const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const distRoot = path.join(__dirname, '../dist');

module.exports = optimize => ({
	mode: 'production',
	optimization: {
		minimize: !!optimize,
	},
	entry: './src/index.js',
	output: {
		path: distRoot,
		filename: optimize ? 'TalendReactComponents.min.js' : 'TalendReactComponents.js',
		library: 'TalendReactComponents',
		libraryTarget: 'umd',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
						rootMode: 'upward',
					},
				},
			},
			{
				test: /\.scss$/,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{
						loader: 'css-loader',
						options: {
							sourceMap: !!optimize,
							modules: {
								localIdentName: '[name]__[local]___[hash:base64:5]',
							},
							importLoaders: 1,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: !!optimize,
							plugins: () => [autoprefixer()],
						},
					},
					{ loader: 'resolve-url-loader' },
					{
						loader: 'sass-loader',
						options: {
							sourceMap: !!optimize,
							prependData: "@import '~@talend/bootstrap-theme/src/theme/guidelines';",
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{ loader: 'css-loader' },
					{ loader: 'postcss-loader', options: { plugins: () => [autoprefixer()] } },
					{ loader: 'resolve-url-loader' },
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'TalendReactComponents.css',
			chunkFilename: 'TalendReactComponents.css',
		}),
		// new BundleAnalyzerPlugin({ analyzerPort: 8080 }),
	],
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
		'react-i18next': 'ReactI18next',
	},
});
