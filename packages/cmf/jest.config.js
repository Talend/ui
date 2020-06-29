const defaults = require('../../node_modules/@talend/scripts-config-jest/jest.config.js');

module.exports = {
	...defaults,
	testRegex: '.*\\.test.js$',
};
