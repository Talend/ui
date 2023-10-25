describe('eslint config', () => {
	it('should require', () => {
		// eslint-disable-next-line global-require
		const config = require('../index');
		expect(config).toBeDefined();
	});
});
