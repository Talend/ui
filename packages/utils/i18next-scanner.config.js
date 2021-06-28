module.exports = {
	options: {
		debug: true,
		func: {
			list: ['t'],
			extensions: ['.js'],
		},
		lngs: ['en'],
		defaultNs: 'tui-utils',
		defaultValue: '__STRING_NOT_TRANSLATED__',
		resource: {
			savePath: 'i18n/{{ns}}.json',
		},
	},
};
