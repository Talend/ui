const path = require('path');
const { defineConfig } = require('cypress');
const getWebpackConfiguration = require('@talend/scripts-config-react-webpack');

const {
	getCommonStyleLoaders,
	getSassLoaders,
	getJSAndTSLoader,
	getSassData,
	getAssetsRules,
} = require('@talend/scripts-config-react-webpack/config/webpack.config.common');

const sassData = {};
const webpackConfig = {
	mode: 'development',
	entry: [path.join(__dirname, 'src', 'index.js')],
	output: {
		path: path.resolve(__dirname, 'dist'),
	},
	devtool: false,
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
		fallback: {
			url: false,
		},
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: /node_modules/,
				use: ['source-map-loader'],
				enforce: 'pre',
			},
			{
				test: /\.(js|ts|tsx)$/,
				exclude: /node_modules/,
				include: [path.resolve(process.cwd(), './src/')],
				use: getJSAndTSLoader(process.env, true),
			},
			{
				test: /\.css$/,
				exclude: /\.module\.css$/,
				include: [path.resolve(process.cwd(), './src/')],
				use: getCommonStyleLoaders(false, true),
			},
			{
				test: /\.module\.css$/,
				include: [path.resolve(process.cwd(), './src/')],
				use: getCommonStyleLoaders(true, true),
			},
			{
				test: /\.scss$/,
				exclude: /\.module\.scss$/,
				include: [path.resolve(process.cwd(), './src/')],
				use: getSassLoaders(false, sassData, true),
			},
			{
				test: /\.module\.scss$/,
				include: [path.resolve(process.cwd(), './src/')],
				use: getSassLoaders(true, sassData, true),
			},
			...getAssetsRules(true),
		].filter(Boolean),
	},
};

module.exports = defineConfig({
	component: {
		devServer: {
			framework: 'react',
			bundler: 'webpack',
			// optionally pass in webpack config
			webpackConfig,
			// or a function - the result is merged with any
			// webpack.config that is found
		},
	},
});
