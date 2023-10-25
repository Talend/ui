/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'cypress';
import path from 'path';

import {
	getWebpackRules,
	getWebpackPlugins,
} from '@talend/scripts-config-react-webpack/config/webpack.config.common';

const webpack = require('webpack');
const srcDirectories = [
	'../components/src',
	'../design-system/src',
	'../design-tokens/src',
	'../theme/src',
]
	.map(src => path.resolve(process.cwd(), src))
	.concat([path.resolve(process.cwd(), './src/')]);

const webpackConfig = {
	mode: 'development',
	entry: [path.join(__dirname, 'src', 'index.ts')],
	output: {
		path: path.resolve(__dirname, 'dist'),
	},
	devtool: false,
	watchOptions: {
		ignored: ['node_modules'],
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
		fallback: {
			url: false,
		},
	},
	module: {
		rules: getWebpackRules(srcDirectories, true, true),
	},
	plugins: getWebpackPlugins().concat([
		new webpack.ProvidePlugin({
			React: 'react',
		}),
	]),
};

export default defineConfig({
	viewportWidth: 400,
	viewportHeight: 400,
	video: false,
	env: {
		reactDevtools: true,
	},
	component: {
		devServer: {
			framework: 'react',
			bundler: 'webpack',
			webpackConfig,
		},
	},
});
