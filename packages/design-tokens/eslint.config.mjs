import config from '@talend/eslint-config';

export default [
	...config,
	{
		rules: {
			'react/display-name': 'warn',
			'@typescript-eslint/quotes': 'off',
		},
	},
];
