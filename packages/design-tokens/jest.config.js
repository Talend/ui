const defaults = require('@talend/scripts-config-jest/jest.config.js');

module.exports = {
	...defaults,
	testRegex: '(/__tests__/.*|src/|scripts/).*\\.test.(js|ts|tsx)$',
};
