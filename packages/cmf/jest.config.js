const defaults = require('@talend/scripts-config-jest/jest.config.js');

module.exports = {
	...defaults,
	testRegex: '.*\\.test.js$',
};
