jest.mock('eslint-plugin-storybook', () => ({
	configs: { 'flat/recommended': [] },
	rules: {},
}));

jest.mock('eslint-plugin-mdx', () => ({
	configs: { flat: {} },
	rules: {},
}));

describe('eslint config', () => {
	it('should require', () => {
		// eslint-disable-next-line global-require
		const config = require('../index');
		expect(config).toBeDefined();
	});
});
