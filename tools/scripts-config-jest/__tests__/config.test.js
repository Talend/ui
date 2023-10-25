import config from '..';

describe('jest config', () => {
	it('should require', () => {
		// note this test is done using the jest
		expect(config).toBeDefined();
	});
});
