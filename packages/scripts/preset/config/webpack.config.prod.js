const webpack = require('webpack');

module.exports = () => ({
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
			},
			comments: false,
			mangle: true,
			minimize: true,
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
	],
});
