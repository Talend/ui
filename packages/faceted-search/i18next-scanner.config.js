module.exports = {
	input: ['src/**/*.js'],
	options: {
		debug: true,
		func: {
			list: ['t', 'i18next.t'],
			extensions: ['.js'],
		},
		lngs: ['en'],
		defaultNs: 'tui-faceted-search',
		defaultValue: '__STRING_NOT_TRANSLATED__',
		resource: {
			savePath: 'i18n-extract/{{ns}}.json',
		},
	},
};
