const config = require('./modules.json');
const helpers = require('@talend/module-to-cdn/test-helpers');

describe('modules.json is ok', () => {
	it('should respect style patterns', () => {
		helpers.assertStyleVersionPatterns(config);
	});
});
