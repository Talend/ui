// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://goo.gl/qPbSyX

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const path = require('path');
const autoprefixer = require.main.require('autoprefixer');
const commonConfiguration = require('../../../.storybook/webpack.config');

module.exports = storybookBaseConfig => {
	const storybookConfig = commonConfiguration(storybookBaseConfig);

	storybookConfig.resolve = {
		alias: {
			'react-cmf': path.join(__dirname, '../node_modules/@talend/react-cmf'),
		},
	};

	storybookConfig.module.rules.push({
		test: /\.css$/,
		use: [
			'style-loader',
			'css-loader',
			{
				loader: 'postcss-loader',
				options: {
					plugins: [autoprefixer({ browsers: ['last 2 versions'] })],
				},
			},
		],
	});

	return storybookConfig;
};
