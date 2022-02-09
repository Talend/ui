module.exports = {
	input: ['tmp/**/*.{js,jsx}'],
	options: {
		debug: true,
		func: {
			list: ['t'],
			extensions: ['.js', '.jsx'],
		},
		lngs: ['en'],
		defaultNs: 'tui-dataviz',
		defaultValue: '__STRING_NOT_TRANSLATED__',
		resource: {
			savePath: 'i18n-extract/{{ns}}.json',
		},
	},
};
