import { vi, describe, it, expect } from 'vitest';

vi.mock('eslint-plugin-mdx', () => ({
	configs: { flat: {} },
	rules: {},
}));

describe('eslint config', () => {
	it('should require', () => {
		const config = require('../index');
		expect(config).toBeDefined();
	});
});
