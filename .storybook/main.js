const visit = require('unist-util-visit');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const tokens = require('../lib/tokens').default;

const getValue = (path, obj) => path.split('.').reduce((acc, c) => acc && acc[c], obj);
const getTokenValue = path => getValue(path, tokens);
const designTokensPlugin = () => tree =>
	visit(tree, 'text', node => {
		const regex = /\$([\w+\.]+\w+)/g;
		const nodeValue = node.value;
		let results;
		while ((results = regex.exec(nodeValue)) !== null) {
			if (getTokenValue(results[1])) {
				node.type = 'html';
				node.value = node.value.replace(
					results[0],
					`<abbr title="${getTokenValue(results[1])}">${results[0]}</abbr>`,
				);
			}
		}
	});

module.exports = {
	stories: [
		'../src/Welcome.stories.mdx',
		'../src/GettingStarted.stories.mdx',
		'../src/Status.stories.mdx',
		'../src/Catalog.stories.mdx',
		'../src/tokens/docs/*.stories.mdx',
		'../src/content/docs/*.stories.mdx',
		'../src/themes/docs/Light.stories.mdx',
		'../src/themes/docs/*.stories.mdx',
		'../src/components/**/*.stories.mdx',
		'../src/components/**/*.stories.js',
		'../src/templates/**/*.stories.mdx',
		'../src/templates/**/*.stories.js',
		'../src/pages/**/*.stories.mdx',
		'../src/pages/**/*.stories.js',
	],
	addons: [
		{
			name: '@storybook/addon-essentials',
			options: {
				backgrounds: false,
			},
		},
		'@storybook/addon-links',
		'@storybook/addon-a11y',
		'storybook-addon-pseudo-states',
		'storybook-addon-mdx-embed',
	],
	webpackFinal: async config => {
		config.entry.unshift('core-js');
		config.module.rules.map(rule => {
			if (rule.use && rule.use.some(use => use.loader && use.loader.includes('@mdx-js'))) {
				return rule.use.map(use => {
					if (use.options && use.options.remarkPlugins) {
						use.options.remarkPlugins.push(designTokensPlugin);
					}
					return use;
				});
			}
			return rule;
		});
		config.plugins.push(
			new BrowserSyncPlugin({
				host: 'localhost',
				port: 3002,
				proxy: 'http://localhost:6006/',
			}),
		);
		return config;
	},
};
