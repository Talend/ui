// eslint-disable-next-line
const typescriptTransform = require('i18next-scanner-typescript');

module.exports = {
	input: ['src/**/*.{ts,tsx}', '!src/**/*stories.{ts,tsx}'],
	options: {
		compatibilityJSON: 'v4',
		debug: true,
		func: {
			list: ['t', 'i18next.t'],
			extensions: ['.js', '.ts', '.tsx'],
		},
		lngs: ['en'],
		defaultNs: 'design-system',
		defaultValue: '__STRING_NOT_TRANSLATED__',
		resource: {
			savePath: 'i18n-extract/{{ns}}.json',
		},
	},
	transform: typescriptTransform(),
};
