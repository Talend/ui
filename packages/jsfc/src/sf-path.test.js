import { parse, stringify, normalize, name } from './sf-path';

describe('sf-path.js', () => {
	it('should hold functions for working with object paths and keys', () => {
		expect(typeof parse).toBe('function');
		expect(typeof stringify).toBe('function');
		expect(typeof normalize).toBe('function');
		expect(typeof name).toBe('function');
	});
});
