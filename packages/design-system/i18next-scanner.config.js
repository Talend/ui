// eslint-disable-next-line
const typescriptTransform = require('i18next-scanner-typescript');

module.exports = {
	input: ['src/**/*.{ts,tsx}'],
	options: {
		debug: true,
		func: {
			list: ['t', 'i18next.t'],
			extensions: ['.js'],
		},
		lngs: ['en'],
		defaultNs: 'design-system',
		defaultValue: '__STRING_NOT_TRANSLATED__',
		resource: {
			savePath: 'i18n-extract/prev-{{ns}}.json',
		},
	},
	transform: typescriptTransform(),
};
