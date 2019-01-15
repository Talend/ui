module.exports = {
	options: {
		debug: true,
		func: {
			list: ['i18next.t', 'i18n.t', 't'],
			extensions: ['.js'],
		},
		lngs: ['en'],
		defaultNs: 'tui-components',
		defaultValue: '__STRING_NOT_TRANSLATED__',
		resource: {
			savePath: 'i18n/{{ns}}.json',
		},
	},
};
