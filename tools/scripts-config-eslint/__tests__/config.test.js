import { vi, describe, it, expect } from 'vitest';
import config from '../index';

vi.mock('eslint-plugin-mdx', () => ({
	configs: { flat: {} },
	rules: {},
}));

describe('eslint config', () => {
	it('should exists', () => {
		expect(config).toBeDefined();
	});
});
