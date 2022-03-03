const webpack = require('webpack');
const pkg = require('./package.json');

module.exports = {
	plugins: [
		new webpack.DefinePlugin({
			'process.env.PACKAGE_VERSION': JSON.stringify(pkg.version),
		}),
	],
};
