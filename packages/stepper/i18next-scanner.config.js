const typescriptTransform = require('i18next-scanner-typescript');

module.exports = {
	input: ['src/**/*.{js,ts,tsx}'],
	options: {
		debug: true,
		func: {
			list: ['t', 'i18next.t'],
			extensions: ['.js'],
		},
		lngs: ['en'],
		defaultNs: 'tui-stepper',
		defaultValue: '__STRING_NOT_TRANSLATED__',
		resource: {
			savePath: 'i18n/{{ns}}.json',
		},
	},
	transform: typescriptTransform(),
};
