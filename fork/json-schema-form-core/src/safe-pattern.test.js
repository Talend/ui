import { findUnsafePattern, isSafePattern } from './safe-pattern';

describe('isSafePattern', () => {
	it.each([
		'^(a|a)+$',
		'^(\\w+\\s?)*$',
		'^(a+)+$',
		'(.*a){20}',
		'^(a|ab)*$',
		'^((a)+)*$',
		'^(?:\\d+\\.?)+$',
		'^(a',
		'a)',
		'[a',
	])('should reject %s', pattern => {
		expect(isSafePattern(pattern)).toBe(false);
	});

	it.each([
		'^[a-z]+$',
		'^\\d{3}-\\d{4}$',
		'^(foo|bar)+$',
		'^(?:ab|ac)*$',
		'^(https?|ftp)://[^\\s]+$',
		'^[\\w.+-]+@[\\w-]+\\.[\\w.]+$',
		'^(\\d+)$',
		'^a{2,5}$',
		'^[(]+$',
	])('should accept %s', pattern => {
		expect(isSafePattern(pattern)).toBe(true);
	});
});

describe('findUnsafePattern', () => {
	it('should return undefined for a safe schema', () => {
		expect(findUnsafePattern({ type: 'string', pattern: '^[a-z]+$' })).toBeUndefined();
	});

	it('should find patterns in nested schemas and patternProperties', () => {
		expect(findUnsafePattern({ properties: { a: { items: { pattern: '^(a|a)+$' } } } })).toBe(
			'^(a|a)+$',
		);
		expect(findUnsafePattern({ patternProperties: { '^(a+)+$': {} } })).toBe('^(a+)+$');
	});

	it('should ignore instance data', () => {
		expect(findUnsafePattern({ default: { pattern: '^(a|a)+$' } })).toBeUndefined();
	});

	it('should not loop on circular schemas', () => {
		const schema = { type: 'object' };
		schema.self = schema;
		expect(findUnsafePattern(schema)).toBeUndefined();
	});
});
