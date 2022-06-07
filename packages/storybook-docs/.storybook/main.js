module.exports = {
	features: {
		buildStoriesJson: true,
		previewCsfV3: true,
	},
	framework: '@storybook/react',
	stories: [
		'../src/components/**/*.stories.mdx',
	],
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
};
