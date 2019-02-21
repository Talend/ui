/* eslint-disable global-require,no-console */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	plugins: [new BundleAnalyzerPlugin()],
};
