// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://goo.gl/qPbSyX

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const CopyPlugin = require('copy-webpack-plugin');
const getConfig = require('../../../.storybook/webpack.config');

module.exports = (...args) => {
	const config = getConfig(...args);
	config.plugins.push(
		new CopyPlugin({
			patterns: [
				{
					from: './.storybook/settings.json',
					to: '/',
				},
			],
		}),
	);
	return config;
};
