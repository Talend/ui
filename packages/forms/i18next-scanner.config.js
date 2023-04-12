// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
const typescriptTransform = require('i18next-scanner-typescript');

module.exports = {
	input: ['src/**/*.{js,ts,tsx}'],
	options: {
		debug: true,
		sort: true,
		func: {
			list: ['t'],
			extensions: ['.js'],
		},
		lngs: ['en'],
		defaultNs: 'tui-forms',
		defaultValue: '__STRING_NOT_TRANSLATED__',
		resource: {
			savePath: 'i18n/prev-{{ns}}.json',
		},
	},
	// Be careful when providing custom arguments: <Trans> detection will break if you don't provide tsConfig: target: es2018
	transform: typescriptTransform(),
};
