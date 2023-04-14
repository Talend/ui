import { defineConfig } from 'cypress';

import path from 'path';
import getWebpackConfiguration from '@talend/scripts-config-react-webpack';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {
	getCommonStyleLoaders,
	getSassLoaders,
	getJSAndTSLoader,
	getSassData,
	getAssetsRules,
} from '@talend/scripts-config-react-webpack/config/webpack.config.common';

const getFileNameForExtension = (extension, prefix) =>
	`${prefix || ''}[name]-[contenthash].${extension}`;

const sassData = '';
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
	plugins: [
		new MiniCssExtractPlugin({
			filename: getFileNameForExtension('css'),
			chunkFilename: getFileNameForExtension('css'),
		}),
	],
};

export default defineConfig({
	component: {
		devServer: {
			framework: 'react',
			bundler: 'webpack',
			webpackConfig,
		},
	},
});
