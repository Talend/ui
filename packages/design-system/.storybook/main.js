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
	features: {
		buildStoriesJson: true,
		modernInlineRender: true,
		previewCsfV3: true,
	},
	refs: {
		'design-tokens': {
			title: "Design Tokens",
			url: "https://3565.talend.surge.sh/design-tokens",
		}
	},
	stories: [
		'../src/Welcome.stories.@(js|tsx|mdx)',
		'../src/GettingStarted.stories.@(js|tsx|mdx)',
		'../src/DesignSystem.stories.@(js|tsx|mdx)',
		'../src/Status.stories.@(js|tsx|mdx)',
		'../src/Catalog.stories.@(js|tsx|mdx)',
		'../src/tokens/docs/*.stories.@(js|tsx|mdx)',
		'../src/content/docs/VoiceAndTone.stories.@(js|tsx|mdx)',
		'../src/content/docs/Internationalization.stories.@(js|tsx|mdx)',
		'../src/content/docs/Conventions.stories.@(js|tsx|mdx)',
		'../src/content/docs/Capitalization.stories.@(js|tsx|mdx)',
		'../src/content/docs/Wording.stories.@(js|tsx|mdx)',
		'../src/themes/docs/Light.stories.@(js|tsx|mdx)',
		'../src/themes/docs/*.stories.@(js|tsx|mdx)',
		'../src/components/**/*.stories.mdx',
		'../src/templates/**/*.stories.@(js|tsx|mdx)',
		'../src/pages/**/*.stories.@(js|tsx|mdx)',
	],
	staticDirs: ['../public', '../static'],
	addons: [
		'@storybook/addon-a11y',
		'@storybook/addon-essentials',
		'@storybook/addon-links',
		'@storybook/addon-interactions',
		{
			name: '@storybook/preset-scss',
			options: {
				cssLoaderOptions: {
					modules: true,
				},
			},
		},
		'storybook-addon-mdx-embed',
	],
	typescript: {
		check: true,
		checkOptions: {},
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
			propFilter: prop => {
				if (prop.parent) {
					// filter inherited props
					return !prop.parent.fileName.includes('node_modules');
				}
				// filter inherited styled-components props
				return !['theme', 'as', 'forwardedAs', 'ref'].includes(prop.name);
			},
		},
	},
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
				notify: false,
				codeSync: false,
			}),
		);
		return config;
	},
};
