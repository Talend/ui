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
	settings: {
		'import/resolver': {
			alias: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
				map: [['~docs', '.storybook/docs']],
			},
		},
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
