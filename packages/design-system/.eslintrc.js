module.exports = {
	root: true,
	extends: [
		'../../node_modules/@talend/scripts-config-eslint/.eslintrc',
		'plugin:storybook/recommended',
	],
	parserOptions: {
		project: ['./tsconfig.json'],

		tsconfigRootDir: __dirname,
	},
	rules: {
		'testing-library/utils-module': 2,
		'testing-library/custom-renders': ['render'],
	},
	settings: {
		'testing-library/utils-module': 'test-utils',
	},
	overrides: [
		{
			files: ['*.@(ts|tsx|js|jsx)'],
			rules: {
				'import/no-extraneous-dependencies': 'off',
				'jsx-a11y/anchor-is-valid': 'off',
			},
		},
		{
			files: ['*.stories.@(ts|tsx)'],
			rules: {
				'react-hooks/rules-of-hooks': 'off',
			},
		},
		{
			files: ['*.spec.@(ts|tsx|js|jsx)'],
			rules: {
				'import/no-unresolved': 'off',
			},
		},
	],
};
