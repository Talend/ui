describe('eslint config', () => {
	it('should require', () => {
		const config = require('../index');
		expect(config).toBeDefined();
	});
});
