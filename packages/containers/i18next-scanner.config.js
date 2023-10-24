module.exports = {
	input: ['src/**/*.{js,jsx}', '!src/**/*stories.{js,jsx}'],
	options: {
		compatibilityJSON: 'v4',
		debug: true,
		func: {
			list: ['t', 'i18next.t'],
			extensions: ['.js', '.jsx'],
		},
		lngs: ['en'],
		defaultNs: 'tui-containers',
		defaultValue: '__STRING_NOT_TRANSLATED__',
		resource: {
			savePath: 'i18n/{{ns}}.json',
		},
	},
};
