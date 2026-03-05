import config from '@talend/eslint-config';

export default [
	...config,
	{
		settings: {
			'import/resolver': {
				node: {
					extensions: ['.js', '.jsx'],
				},
			},
		},
	},
];
