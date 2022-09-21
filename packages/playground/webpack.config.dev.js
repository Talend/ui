const path = require('path');
const webpack = require('webpack');
const resolve = require('@talend/dynamic-cdn-webpack-plugin/src/resolve-pkg');
const buildFormUtils = require('@talend/react-forms/build-utils');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const mockBackend = require('./mockBackend/server');

/*
 * because we are in dev mode our webpack config do not detect cdn resources in the yarn.lock.
 * so we compute the path of the resources to copy.
 */

const patterns = buildFormUtils.getWebpackCopyConfig();

const webpackConfig = {
	plugins: [new CopyWebpackPlugin({ patterns })],
	output: {
		publicPath: process.env.BASENAME || '/',
	},
	devServer: {
		setupMiddlewares: (middlewares, devServer) => {
			mockBackend(devServer);
			return middlewares;
		},
		historyApiFallback: {
			index: `${process.env.BASENAME || '/'}index.html`,
		},
	},
};

module.exports = webpackConfig;
