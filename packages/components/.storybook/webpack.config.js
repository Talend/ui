// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://goo.gl/qPbSyX

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const autoprefixer = require('autoprefixer');
const SASS_DATA = `@import '~bootstrap-talend-theme/src/theme/guidelines';`;

module.exports = {
	plugins: [
		// your custom plugins
	],
	module: {
		loaders: [
			{
				test: /\.woff(2)?(\?[a-z0-9=&.]+)?$/,
				loader: 'url-loader',
				options: {
					limit: 50000,
					mimetype: 'application/font-woff',
					name: './fonts/[name].[ext]'
				}
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss', 'sass'],
			},
		],
	},
	postcss: [
		require('autoprefixer')({
			browsers: ['last 2 versions']
		})
	],
	sassLoader: {
		data: SASS_DATA,
	},
	postcss: function () {
		return [autoprefixer({ browsers: ['last 2 versions'] })];
	},
};
