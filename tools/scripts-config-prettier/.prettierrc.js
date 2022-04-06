module.exports = {
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
