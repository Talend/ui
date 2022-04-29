const path = require('path');
const custom = require('../webpack.config.js');

module.exports = {
	stories: [
		'../src/**/*.stories.@(js|jsx|mdx|ts|tsx)',
		'../stories/**/*.stories.@(js|jsx|mdx|ts|tsx)',
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'storybook-dark-mode',
	],
	framework: '@storybook/react',
	core: {
		builder: '@storybook/builder-webpack5',
	},
	webpackFinal: async config => {
		config.module.rules = config.module.rules.filter(rule => !rule.test.toString().includes('svg'));
		config.module.rules = config.module.rules.concat(custom.module.rules);
		config.module.rules.push({
			test: /\.scss$/,
			use: ['style-loader', 'css-loader', 'sass-loader'],
			include: path.resolve(__dirname, '../'),
		});
		return config;
	},
	typescript: { reactDocgen: false },
};
