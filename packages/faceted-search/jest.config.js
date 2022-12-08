const defaults = require('@talend/scripts-config-jest/jest.config.js');

module.exports = {
	...defaults,
	setupFilesAfterEnv: [...defaults.setupFilesAfterEnv, './jest.setup.js'],
};
