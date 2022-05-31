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
		defaultNs: 'tui-datagrid',
		defaultValue: '__STRING_NOT_TRANSLATED__',
		resource: {
			savePath: 'i18n/{{ns}}.json',
		},
	},
	// Be careful when providing custom arguments: <Trans> detection will break if you don't provide tsConfig: target: es2018
	transform: typescriptTransform(),
};
