module.exports = {
	...require('@talend/scripts-config-prettier'),
	overrides: [
		{
			files: 'fork/module-to-cdn/**/*',
			...require('./fork/module-to-cdn/.prettierrc'),
		},
		{
			files: 'packages/design-system/**/*',
			...require('./packages/design-system/.prettierrc'),
		},
		{
			files: 'packages/stepper/**/*',
			...require('./packages/stepper/.prettierrc'),
		},
		{
			files: 'packages/storybook-docs/**/*',
			...require('./packages/storybook-docs/.prettierrc'),
		},
	],
};
