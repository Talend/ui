const path = require('path');
const talendScripts = require('@talend/scripts-config-jest/jest.config');

talendScripts.setupFilesAfterEnv.push(path.join(__dirname, 'test', 'test-setup.js'));

module.exports = {
	...talendScripts,
};
