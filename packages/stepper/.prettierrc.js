module.exports = {
	...require('@talend/scripts-config-prettier'),
	importOrder: [
		'^@babel/polyfill',
		'^focus-outline-manager',
		'^./(i18n|vendor)',
		'^react',
		'^(?!react|@talend|[.])',
		'^@talend/(.*)$',
		'^[./](?!.*scss)',
		'.*scss',
	],
	importOrderSeparation: true,
	experimentalBabelParserPluginsList: ['jsx', 'typescript'],
};
