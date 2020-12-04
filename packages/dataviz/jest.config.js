process.env.TZ = 'Europe/Paris';

const defaults = require('@talend/scripts-config-jest/jest.config.js');

module.exports = {
	...defaults,
	globals: {
		...defaults.globals,
		'ts-jest': {
			...defaults.globals['ts-jest'],
			diagnostics: {
				warnOnly: true,
				ignoreCodes: [2722]
			},
		},
	},
};
