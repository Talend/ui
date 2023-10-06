import { traverseSchema, traverseForm } from './traverse';

describe('traverse.js', () => {
	it('should hold functions for applying functions on branches of a json-schema or ui-schema', () => {
		expect(typeof traverseSchema).toBe('function');
		expect(typeof traverseForm).toBe('function');
	});
});
