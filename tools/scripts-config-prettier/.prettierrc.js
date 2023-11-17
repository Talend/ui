module.exports = {
	plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
	importOrder: [
		'^@babel/polyfill',
		'jquery', // jquery needs to be imported before angular
		'^focus-outline-manager',
		'^./(i18n|vendor)',
		'^react',
		'^(?!react|@talend|[.])',
		'^@talend/(.*)$',
		'^[./](?!.*scss)',
		'.*scss',
	],
	importOrderSeparation: true,
	importOrderParserPlugins: ['jsx', 'typescript'],
	printWidth: 100,
	singleQuote: true,
	trailingComma: 'all',
	semi: true,
	useTabs: true,
	arrowParens: 'avoid',
	overrides: [
		{
			files: ['**/*.json', '**/*rc'],
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
};
