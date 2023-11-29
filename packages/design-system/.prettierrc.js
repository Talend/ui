module.exports = {
	...require('@talend/scripts-config-prettier'),
	arrowParens: 'avoid',
	printWidth: 100,
	singleQuote: true,
	trailingComma: 'all',
	semi: true,
	useTabs: true,
	overrides: [
		{
			files: '**/*.json',
			options: {
				tabWidth: 2,
				useTabs: false,
			},
		},
		{
			files: '**/*.scss',
			options: {
				printWidth: 1000,
			},
		},
	],
	importOrderParserPlugins: ['jsx', 'typescript'],
};
